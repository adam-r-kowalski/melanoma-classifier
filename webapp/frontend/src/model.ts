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
  'Gradien Descent',
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
