import tensorflow as tf
import json
import os
from skimage.io import imread


tf.enable_eager_execution()


json_files = tf.gfile.Glob('/data/ISIC-images/**/*.json')


def diagnosis(json_file):
    with tf.gfile.FastGFile(json_file) as f:
        return json.loads(f.read())['meta']['clinical']['diagnosis']


def split_by_label(json_files):
    melanoma = []
    not_melanoma = []

    for file in json_files:
        file_without_extension, _ = os.path.splitext(file)
        image = file_without_extension + '.jpg'

        if diagnosis(file) == 'melanoma':
            melanoma.append(image)
        else:
            not_melanoma.append(image)

    return melanoma, not_melanoma


def resize_and_encode_image(image):
    length = int(max(image.shape[0], image.shape[1]))
    image = tf.image.resize_image_with_crop_or_pad(
        image, target_width=length, target_height=length)

    length = 2**8
    image = tf.image.resize_images(image, (length, length))
    return tf.image.encode_png(tf.cast(image, tf.uint8)).numpy()


def bytes_feature(value):
    return tf.train.Feature(bytes_list=tf.train.BytesList(value=[value]))


def int_feature(value):
    return tf.train.Feature(int64_list=tf.train.Int64List(value=[value]))


def example_from_file(image_file, label):
    image = resize_and_encode_image(imread(image_file))

    return tf.train.Example(features=tf.train.Features(feature={
        'image': bytes_feature(image),
        'label': int_feature(label)
    }))


def write(files, record, label):
    filename = '/data/tf-records/{}.tfrecords'.format(record)
    with tf.python_io.TFRecordWriter(filename) as writer:
        for file in files:
            try:
                example = example_from_file(file, label)
                writer.write(example.SerializeToString())
            except BaseException:
                continue


melanoma, not_melanoma = split_by_label(json_files)

write(melanoma, 'melanoma', 1)
write(not_melanoma, 'not_melanoma', 0)
