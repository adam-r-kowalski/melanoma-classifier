import tensorflow as tf
import os
import json

from layer import layer
from optimizer import optimizer
from dataset import train_dataset


def read_json(name):
    with open('/models/{}/model.json'.format(name)) as f:
        return json.loads(f.read())


def load_weights(name, model):
    path = '/models/{}/weights.h5'.format(name)
    if os.path.exists(path):
        images, _ = next(iter(train_dataset().batch(10)))
        model(images)
        model.load_weights(path)


def create_model(model_json, train):
    model = tf.keras.Sequential()
    for l in model_json['layers']:
        model.add(layer(l, train))
    load_weights(model_json['name'], model)
    return model, optimizer(model_json)
