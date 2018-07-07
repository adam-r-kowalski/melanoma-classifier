import json
import tensorflow as tf

from dispatch import multi, method
from fields import field_value, field_values

tf.enable_eager_execution()


with open("/models/Convolution/model.json") as f:
    model = json.loads(f.read())

layers = model['layers']


@multi
def layer(layer_json):
    return layer_json['name']


@method(layer, 'Convolution 2D')
def layer(convolution2d):
    filters = field_value(convolution2d, 'filters')
    kernel = field_values(convolution2d, 'kernel', ['width', 'height'])
    strides = field_values(convolution2d, 'strides', ['width', 'height'])
    return tf.keras.layers.Conv2D(filters, kernel, strides)


@method(layer)
def layer(unkown_layer):
    raise Exception('Invalid Layer')


layer(layers[0]).get_config()
