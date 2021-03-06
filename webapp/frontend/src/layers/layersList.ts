// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { ILayer } from '../model';
import BatchNormalization from './BatchNormalization';
import Convolution2D from './Convolution2D';
import Dense from './Dense';
import Dropout from './Dropout';
import Flatten from './Flatten';
import RectifiedLinearUnit from './RectifiedLinearUnit';
import Sigmoid from './Sigmoid';

const layersList: { [name: string]: () => ILayer } = {
  'Batch Normalization': () => new BatchNormalization(),
  'Convolution 2D': () => new Convolution2D(),
  Dense: () => new Dense(),
  Dropout: () => new Dropout(),
  Flatten: () => new Flatten(),
  'Rectified Linear Unit': () => new RectifiedLinearUnit(),
  Sigmoid: () => new Sigmoid(),
};

export default layersList;
