import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, Theme } from '@material-ui/core/styles';

import BatchNormalization from './layers/BatchNormalization';
import Convolution2D from './layers/Convolution2D';
import Dense from './layers/Dense';
import Dropout from './layers/Dropout';
import Flatten from './layers/Flatten';
import RectifiedLinearUnit from './layers/RectifiedLinearUnit';
import { IModel } from './model';

export interface IState {
  drawer: boolean;
  model: string;
  models: { [name: string]: IModel };
  tab: number;
  theme: Theme;
}

export const empty: IState = {
  drawer: false,
  model: 'Convolution',
  models: {
    Convolution: {
      layers: [
        new Convolution2D(),
        new Dropout(),
        new RectifiedLinearUnit(),
        new BatchNormalization(),
        new Flatten(),
        new Dense(),
      ],
    },
    Dense: {
      layers: [
        new Flatten(),
        new Dense(),
        new Dropout(),
        new RectifiedLinearUnit(),
        new BatchNormalization(),
        new Dense(),
        new Dropout(),
        new RectifiedLinearUnit(),
        new BatchNormalization(),
        new Dense(),
      ],
    },
  },
  tab: 3,
  theme: createMuiTheme({
    palette: {
      primary: blue,
    },
  }),
};
