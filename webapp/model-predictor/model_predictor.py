from aiohttp import web
import tensorflow as tf
import base64

from dataset import test_dataset
from to_keras import create_model, read_json

config = tf.ConfigProto()
config.gpu_options.allow_growth = True

tf.enable_eager_execution(config)


def encode_image_to_base64_png(image):
    scaled = tf.cast(image * 255, tf.uint8)
    png = tf.image.encode_png(scaled).numpy()
    return base64.b64encode(png).decode('utf-8')


def prediction_to_json(image, label, prediction):
    return {
        'image': encode_image_to_base64_png(image),
        'label': int(label.numpy()),
        'prediction': int(prediction.numpy())
    }


def predictions(model, images):
    return tf.cast(tf.round(tf.sigmoid(model(images))), tf.int64)


def dataset():
    return test_dataset().shuffle(200).batch(10)


def results(model):
    images, labels = next(iter(dataset()))

    return tf.data.Dataset.from_tensor_slices(
        (images, labels, predictions(model, images)))


def predictions_json(name):
    model, _ = create_model(read_json(name), True)

    return [prediction_to_json(*result) for result in results(model)]


routes = web.RouteTableDef()


@routes.post('/')
async def root(request):
    name = await request.json()
    return web.json_response(predictions_json(name))


app = web.Application()
app.router.add_routes(routes)
web.run_app(app)
