import tensorflow as tf

from layer import layer

tf.enable_eager_execution()


def create_model(model_json):
    model = tf.keras.Sequential()
    for l in model_json['layers']:
        model.add(layer(l))
    return model


async def write_keras_model(model_json):
    model = create_model(model_json)
    path = '/models/{}/model.h5'.format(model_json['name'])
    tf.keras.models.save_model(
        model, path, overwrite=True, include_optimizer=False)
