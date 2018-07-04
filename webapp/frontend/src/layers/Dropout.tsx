import * as React from 'react';

import { ILayer } from '../model';

export default class Dropout implements ILayer {
  public readonly name = 'Dropout';
  public rate: number = 0.3;
}
