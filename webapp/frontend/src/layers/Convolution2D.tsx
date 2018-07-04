import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import { IField, ILayer } from '../model';

export default class Convolution2D implements ILayer {
  public readonly name = 'Convolution 2D';

  public fields: IField[] = [
    {
      name: 'filters',
      value: 5,
    },
    {
      group: [
        {
          name: 'width',
          value: 3,
        },
        {
          name: 'height',
          value: 3,
        },
      ],
      name: 'kernel',
    },
    {
      group: [
        {
          name: 'width',
          value: 3,
        },
        {
          name: 'height',
          value: 3,
        },
      ],
      name: 'strides',
    },
  ];
}
