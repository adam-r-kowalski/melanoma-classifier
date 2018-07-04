import * as React from 'react';

import { IField, ILayer } from '../model';

export default class Dense implements ILayer {
  public readonly name = 'Dense';
  public units: number = 1;

  public fields: IField[] = [
    {
      name: 'units',
      value: 1,
    },
  ];
}
