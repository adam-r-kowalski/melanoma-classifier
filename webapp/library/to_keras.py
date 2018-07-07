import tensorflow as tf

from layer import layer
from dataset import train_dataset


def create_model(model_json):
    model = tf.keras.Sequential()
    for l in model_json['layers']:
        model.add(layer(l))
    return model


async def write_keras_model(model_json):
    model = create_model(model_json)
    path = '/models/{}/weights.h5'.format(model_json['name'])
    dataset = train_dataset().batch(1)
    image, _ = next(iter(dataset))
    model(image)
    model.save_weights(path, overwrite=True)
