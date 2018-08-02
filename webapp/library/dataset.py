# Copyright (c) 2018 Adam Kowalski
# This code is available under the "Apache License 2.0"
# Please see the file COPYING in this distribution for license terms.

import tensorflow as tf
import math
from multiprocessing import cpu_count

files = tf.gfile.Glob('/data/tf-records/batches/*.tfrecords')

train_test_split = math.ceil(len(files) * 0.7)

train_files = files[:train_test_split]

test_files = files[train_test_split:]

num_parallel_calls = cpu_count()


def decode_example(example):
    parsed_example = tf.parse_single_example(example, {
        'image': tf.FixedLenFeature([], tf.string),
        'label': tf.FixedLenFeature([], tf.int64)
    })
    image = tf.image.decode_png(parsed_example['image'])
    label = parsed_example['label']
    return image / 255, tf.reshape(label, (1,))


def dataset(files):
    return tf.data.TFRecordDataset(files) \
        .map(decode_example, num_parallel_calls)


def train_dataset():
    return dataset(train_files)


def test_dataset():
    return dataset(test_files)
