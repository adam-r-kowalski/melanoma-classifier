// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

export interface INestedField {
  name: string;
  value?: number;
}

export interface IField {
  name: string;
  value?: number;
  group?: INestedField[];
}

export interface ILayer {
  name: string;
  id: string;
  fields?: IField[];
}

export const optimizers = [
  'Adadelta',
  'Adagrad',
  'Adam',
  'Gradient Descent',
  'Momentum',
  'RMSProp',
];

export interface IModel {
  batchSize: number;
  layers: ILayer[];
  learningRate: number;
  optimizer: string;
  name: string;
}
