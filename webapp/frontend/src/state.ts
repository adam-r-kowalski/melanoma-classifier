import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, Theme } from '@material-ui/core/styles';
import * as io from 'socket.io-client';

import BatchNormalization from './layers/BatchNormalization';
import Convolution2D from './layers/Convolution2D';
import Dense from './layers/Dense';
import Dropout from './layers/Dropout';
import Flatten from './layers/Flatten';
import RectifiedLinearUnit from './layers/RectifiedLinearUnit';
import { IModel } from './model';

export interface IModels {
  [name: string]: IModel;
}

export interface INotification {
  message: string;
}

export interface IIteration {
  accuracy: number;
  iteration: number;
  loss: number;
}

export interface IEpoch {
  [epoch: number]: IIteration;
}

export interface ITraining {
  train: IEpoch;
  test: IEpoch;
}

export interface IStarted {
  message: 'started';
}

export interface IRunning {
  message: 'running';
  accuracy: number;
  epoch: number;
  iteration: number;
  loss: number;
  train: boolean;
}

export interface IFinished {
  message: 'finished';
}

export type Message = IStarted | IRunning | IFinished;

export interface IState {
  drawer: boolean;
  notifications: INotification[];
  model: string;
  modelRunner: {
    ready: boolean
    socket: SocketIOClient.Socket,
  };
  models: { [name: string]: IModel };
  tab: number;
  theme: Theme;
  training: ITraining;
}

export const empty: IState = {
  drawer: false,
  model: undefined,
  modelRunner: {
    ready: false,
    socket: io(),
  },
  models: {},
  notifications: [],
  tab: 1,
  theme: createMuiTheme({
    palette: {
      primary: blue,
    },
  }),
  training: {
    test: {},
    train: {},
  },
};
