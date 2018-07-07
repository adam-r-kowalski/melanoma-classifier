import tensorflow as tf
from multiprocessing import cpu_count

tf.enable_eager_execution()

files = tf.gfile.Glob('/data/tf-records/batches/*.tfrecords')


def decode_example(example):
    parsed_example = tf.parse_single_example(example, {
        'image': tf.FixedLenFeature([], tf.string),
        'label': tf.FixedLenFeature([], tf.int64)
    })
    image = tf.image.decode_png(parsed_example['image'])
    label = parsed_example['label']
    return image / 255, tf.reshape(label, (1,))


num_parallel_calls = cpu_count()
learning_rate = 0.01


dataset = tf.data.TFRecordDataset(files)
dataset = dataset.map(decode_example, num_parallel_calls)
dataset = dataset.batch(10)

images, labels = next(iter(dataset))

model = tf.keras.models.load_model(
    '/models/Convolution/model.h5', compile=False)


def loss(model, images, labels):
    return tf.losses.sigmoid_cross_entropy(labels, model(images))


def grad(model, images, labels):
    with tf.GradientTape() as tape:
        loss_value = loss(model, images, labels)
    return tape.gradient(loss_value, model.variables)


optimizer = tf.train.AdamOptimizer(learning_rate)

for images, labels in dataset:
    grads = grad(model, images, labels)
    optimizer.apply_gradients(zip(grads, model.variables),
                              tf.train.get_or_create_global_step())
    predictions = tf.cast(tf.round(tf.sigmoid(model(images))), tf.int64)

predictions

labels


model(images)


loss(model, images, labels)


tf.keras.models.save_model(
    model, '/models/Convolution/model.h5',
    overwrite=True, include_optimizer=False)
