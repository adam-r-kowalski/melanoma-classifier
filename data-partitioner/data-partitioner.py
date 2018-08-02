# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

import tensorflow as tf

tf.enable_eager_execution()

base = '/data/tf-records/'

melanoma = tf.data.TFRecordDataset(base + 'melanoma.tfrecords')

not_melanoma = tf.data.TFRecordDataset(base + 'not_melanoma.tfrecords')

for not_melanoma_length, _ in enumerate(not_melanoma):
    continue

melanoma_repeated = melanoma.repeat().take(not_melanoma_length)

dataset = melanoma_repeated.concatenate(not_melanoma) \
                           .shuffle(25000).batch(1000)

for i, examples in enumerate(dataset):
    filename = base + 'batches/batch_{}.tfrecords'.format(i)
    with tf.python_io.TFRecordWriter(filename) as writer:
        for example in examples:
            writer.write(example.numpy())
