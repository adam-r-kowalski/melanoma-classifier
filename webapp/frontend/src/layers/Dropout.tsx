import * as React from 'react';

import { IField, ILayer } from '../model';

export default class Dropout implements ILayer {
  public readonly name = 'Dropout';

  public fields: IField[] = [
    {
      name: 'rate',
      value: 0.3,
    },
  ];
}
