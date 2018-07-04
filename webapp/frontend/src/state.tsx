import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

import Convolution2D from './layers/Convolution2D';
import Dropout from './layers/Dropout';
import Flatten from './layers/Flatten';
import RectifiedLinearUnit from './layers/RectifiedLinearUnit';
import BatchNormalization from './layers/BatchNormalization';
import Dense from './layers/Dense';
import { IModel } from './model';

export interface IState {
  model: IModel;
  theme: Theme;
}

export const empty: IState = {
  model: {
    layers: [
      new Convolution2D(),
      new Dropout(),
      new RectifiedLinearUnit(),
      new BatchNormalization(),
      new Flatten(),
      new Dense(),
    ],
  },
  theme: createMuiTheme({
    palette: {
      primary: blue,
    },
  }),
};
