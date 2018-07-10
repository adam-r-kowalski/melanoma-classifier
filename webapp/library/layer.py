import tensorflow as tf

from dispatch import multi, method
from fields import field_value, field_values


@multi
def layer(layer_json):
    return layer_json['name']


@method(layer, 'Batch Normalization')
def layer(batch_normalization):
    return tf.keras.layers.BatchNormalization()


@method(layer, 'Convolution 2D')
def layer(convolution2d):
    filters = field_value(convolution2d, 'filters')
    kernel = field_values(convolution2d, 'kernel', ['width', 'height'])
    strides = field_values(convolution2d, 'strides', ['width', 'height'])
    return tf.keras.layers.Conv2D(filters, kernel, strides)


@method(layer, 'Dense')
def layer(dense):
    units = field_value(dense, 'units')
    return tf.keras.layers.Dense(units)


@method(layer, 'Dropout')
def layer(dense):
    rate = field_value(dense, 'rate')
    return tf.keras.layers.Dropout(rate)


@method(layer, 'Flatten')
def layer(flatten):
    return tf.keras.layers.Flatten()


@method(layer, 'Rectified Linear Unit')
def layer(rectified_linear_unit):
    return tf.keras.layers.Activation('relu')


@method(layer, 'Sigmoid')
def layer(sigmoid):
    return tf.keras.layers.Activation('sigmoid')


@method(layer)
def layer(unkown_layer):
    raise Exception('Invalid Layer')
