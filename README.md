# melanoma-classifier

## Author

Adam Kowalski

## Copyright

Copyright &copy; 2018 Adam Kowalski

## Contact Me

adam.kowalski.work@gmail.com

kowalski@pdx.edu

## Description

This project will try to look at medical images and determine whether or not they contain melanoma.
Through the use of deep learning, I will build models that try to extract features from the images
so that I can correctly classify the images.

Reproducability of results is a huge concern in the field of deep learning, so I will use docker to
ensure environmental differences between developers are kept to a minimum. There will be containers
for getting the dataset, as well as building, training and evaluating models.

Another cruicial aspect of developing models is tuning hyper parameters. It is important to change them
in a controlled way, so that you can understand which models performed better and get an intution into
how to change them in the future so that they may keep getting better.

## Bug Tracker

https://github.com/adam-r-kowalski/melanoma-classifier/issues

## Usage

### Clone the repo

```
git clone https://github.com/adam-r-kowalski/melanoma-classifier.git
cd melanoma-classifier
```

### Install Docker

In order to ensure no environmental differences between developers, docker is used.
Follow the [installation instructions](https://docs.docker.com/install/) for your platform.

Because we want to take advantage of the GPU to make training much faster, we need to also
install [nvidia-docker](https://github.com/NVIDIA/nvidia-docker).

### Download the data

This service will download the dataset from [The International Skin Imaging Collaboration](https://isic-archive.com/#images)
who generously provide thousands of examples of various skin related diseases.

`docker-compose -f data-downloader/docker-compose.yml up`

### Label the data

This service will take our data and create an efficient binary representation which contains both
the images as well as the labels.

`docker-compose -f data-labeler/docker-compose.yml up`

## Partition the data

This service will take our dataset and partition it into batches of 1000 as well as ensure that we have
an even distribution of melanoma to non melanoma images

`docker-compose -f data-partitioner/docker-compose.yml up`

## Launch the webapp

This service will allow you to construct and train models

`docker-compose -f webapp/docker-compose.yml up`

## License

This code is available under the "Apache License 2.0". Please see the COPYING in this distribution for license terms.