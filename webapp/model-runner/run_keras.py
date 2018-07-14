import tensorflow as tf
import json

from dataset import train_dataset
from to_keras import create_model

config = tf.ConfigProto()
config.gpu_options.allow_growth = True

tf.enable_eager_execution(config)


def read_json(name):
    with open('/models/{}/model.json'.format(name)) as f:
        return json.loads(f.read())


def dataset(batch_size):
    return train_dataset().batch(batch_size).shuffle(100).prefetch(2)


def loss(model, images, labels):
    return tf.losses.sigmoid_cross_entropy(labels, model(images))


def grad(model, images, labels):
    with tf.GradientTape() as tape:
        loss_value = loss(model, images, labels)
    return tape.gradient(loss_value, model.variables)


def train(ws, model, optimizer, epochs, batch_size):
    for epoch in range(epochs):
        correct = 0
        total = 0

        for iteration, (images, labels) in enumerate(dataset(batch_size)):
            grads = grad(model, images, labels)
            optimizer.apply_gradients(
                zip(grads, model.variables),
                tf.train.get_or_create_global_step())

            predictions = tf.cast(
                tf.round(tf.sigmoid(model(images))), tf.int64)

            correct += tf.reduce_sum(
                tf.cast(
                    tf.equal(predictions, labels), tf.int32))

            total += images.shape[0]
            ws.send_json({
                'accuracy': (correct / total).numpy(),
                'epoch': epoch,
                'iteration': iteration
            })


def train_model(ws, msg_json):
    name = msg_json['model']
    epochs = msg_json['epochs']
    model_json = read_json(name)
    batch_size = model_json['batchSize']
    model, optimizer = create_model(model_json)
    train(ws, model, optimizer, epochs, batch_size)
    model.save_weights('/models/{}/weights.h5'.format(name), overwrite=True)
