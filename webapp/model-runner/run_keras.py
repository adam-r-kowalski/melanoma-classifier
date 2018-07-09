import tensorflow as tf
import json

from dataset import train_dataset
from to_keras import create_model

config = tf.ConfigProto()
config.gpu_options.allow_growth = True

tf.enable_eager_execution(config)

learning_rate = 0.01

dataset = train_dataset().batch(32).shuffle(100).prefetch(2)

images, labels = next(iter(dataset))

with open('/models/Convolution/model.json') as f:
    model_json = json.loads(f.read())


model = create_model(model_json)


model(images)


model.load_weights('/models/Convolution/weights.h5')


def loss(model, images, labels):
    return tf.losses.sigmoid_cross_entropy(labels, model(images))


def grad(model, images, labels):
    with tf.GradientTape() as tape:
        loss_value = loss(model, images, labels)
    return tape.gradient(loss_value, model.variables)


optimizer = tf.train.AdamOptimizer(learning_rate)


def train():
    for images, labels in dataset:
        grads = grad(model, images, labels)
        optimizer.apply_gradients(zip(grads, model.variables),
                                  tf.train.get_or_create_global_step())


predictions = tf.cast(tf.round(tf.sigmoid(model(images))), tf.int64)
predictions

labels

tf.equal(predictions, labels)

model(images)

loss(model, images, labels)

grads = grad(model, images, labels)

optimizer.apply_gradients(zip(grads, model.variables),
                          tf.train.get_or_create_global_step())

train()


model.save_weights('/models/Convolution/weights.h5', overwrite=True)
