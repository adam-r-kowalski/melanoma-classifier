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
  fields?: IField[];
}

export interface IModel {
  layers: ILayer[];
}
