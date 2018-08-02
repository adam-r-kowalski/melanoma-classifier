# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

import tensorflow as tf

from dispatch import multi, method
from fields import field_value, field_values


@multi
def layer(layer_json, train):
    return layer_json['name']


@method(layer, 'Batch Normalization')
def layer(batch_normalization, train):
    return tf.keras.layers.BatchNormalization()


@method(layer, 'Convolution 2D')
def layer(convolution2d, train):
    filters = field_value(convolution2d, 'filters')
    kernel = field_values(convolution2d, 'kernel', ['width', 'height'])
    strides = field_values(convolution2d, 'strides', ['width', 'height'])
    return tf.keras.layers.Conv2D(filters, kernel, strides)


@method(layer, 'Dense')
def layer(dense, train):
    units = field_value(dense, 'units')
    return tf.keras.layers.Dense(units)


@method(layer, 'Dropout')
def layer(dense, train):
    rate = field_value(dense, 'rate') if train else 0.0
    return tf.keras.layers.Dropout(rate)


@method(layer, 'Flatten')
def layer(flatten, train):
    return tf.keras.layers.Flatten()


@method(layer, 'Rectified Linear Unit')
def layer(rectified_linear_unit, train):
    return tf.keras.layers.Activation('relu')


@method(layer, 'Sigmoid')
def layer(sigmoid, train):
    return tf.keras.layers.Activation('sigmoid')
