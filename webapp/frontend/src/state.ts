export interface ILayer {
  name: string;
}

export interface IModel {
  layers: ILayer[];
}

export interface IState {
  model: IModel;
}

export const empty: IState = {
  model: {
    layers: [
      { name: 'Convolution 2D' },
      { name: 'Flatten' },
      { name: 'Dense' },
    ],
  },
};
