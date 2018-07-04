import * as React from 'react';

import { ILayer } from '../model';

export default class Dense implements ILayer {
  public readonly name = 'Dense';
  public units: number = 1;
}
