import tensorflow as tf
import os

from layer import layer
from optimizer import optimizer
from dataset import train_dataset


def load_weights(name, model):
    path = '/models/{}/weights.h5'.format(name)
    if os.path.exists(path):
        images, _ = next(iter(train_dataset().batch(10)))
        model(images)
        model.load_weights(path)


def create_model(model_json):
    model = tf.keras.Sequential()
    for l in model_json['layers']:
        model.add(layer(l))
    load_weights(model_json['name'], model)
    return model, optimizer(model_json)
