# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

import tensorflow as tf
import tensorflow.contrib.eager as tfe
import json

from dataset import train_dataset, test_dataset
from to_keras import create_model, read_json

config = tf.ConfigProto()
config.gpu_options.allow_growth = True

tf.enable_eager_execution(config)


def dataset(batch_size, train):
    ds = train_dataset() if train else test_dataset()
    ds = ds.batch(batch_size)
    if train:
        ds = ds.shuffle(200)
    return ds.prefetch(2)


def loss(model, images, labels):
    return tf.losses.sigmoid_cross_entropy(labels, model(images))


def grad(model, images, labels):
    with tf.GradientTape() as tape:
        loss_value = loss(model, images, labels)
    return tape.gradient(loss_value, model.variables)


def run(ws, model_json, epoch, train=True):
    model, optimizer = create_model(model_json, train)
    name = model_json['name']

    accuracy_mean = tfe.metrics.Accuracy()
    loss_mean = tfe.metrics.Mean()

    data = dataset(model_json['batchSize'], train)

    for iteration, (images, labels) in enumerate(data):
        if train:
            grads = grad(model, images, labels)
            optimizer.apply_gradients(
                zip(grads, model.variables),
                tf.train.get_or_create_global_step())

        predictions = tf.cast(
            tf.round(tf.sigmoid(model(images))), tf.int64)

        accuracy_mean(labels, predictions)
        loss_mean(loss(model, images, labels))

        ws.send_json({
            'accuracy': accuracy_mean.result().numpy(),
            'epoch': epoch,
            'iteration': iteration,
            'loss': loss_mean.result().numpy(),
            'message': 'running',
            'train': train
        })

    if train:
        model.save_weights(
            '/models/{}/weights.h5'.format(name), overwrite=True)


def train_model(ws, msg_json):
    model_json = read_json(msg_json['model'])

    for epoch in range(msg_json['epochs']):
        run(ws, model_json, epoch)
        run(ws, model_json, epoch, train=False)
