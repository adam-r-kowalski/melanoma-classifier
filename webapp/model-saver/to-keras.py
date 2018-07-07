import tensorflow as tf
import json

from layer import layer

with open("/models/Convolution/model.json") as f:
    model_json = json.loads(f.read())


def create_model(model_json):
    model = tf.keras.Sequential()
    for l in model_json['layers']:
        model.add(layer(l))
    return model


layers = model_json['layers']


layer(layers[0]).get_config()


create_model(model_json).layers
