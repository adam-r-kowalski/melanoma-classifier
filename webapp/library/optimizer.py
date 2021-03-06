# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

import tensorflow as tf

from dispatch import multi, method


@multi
def optimizer(model_json):
    return model_json['optimizer']


@method(optimizer, 'Adadelta')
def optimizer(model_json):
    return tf.train.AdadeltaOptimizer(model_json['learningRate'])


@method(optimizer, 'Adagrad')
def optimizer(model_json):
    return tf.train.AdagradOptimizer(model_json['learningRate'])


@method(optimizer, 'Adam')
def optimizer(model_json):
    return tf.train.AdamOptimizer(model_json['learningRate'])


@method(optimizer, 'Gradient Descent')
def optimizer(model_json):
    return tf.train.GradientDescentOptimizer(model_json['learningRate'])


@method(optimizer, 'Momentum')
def optimizer(model_json):
    return tf.train.AdamOptimizer(model_json['learningRate'])


@method(optimizer, 'RMSProp')
def optimizer(model_json):
    return tf.train.AdamOptimizer(model_json['learningRate'])
