// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import counter from '../counter';
import { ILayer } from '../model';

const name = 'Rectified Linear Unit';
const nextId = counter(name);

export default class RectifiedLinearUnit implements ILayer {
  public readonly name = name;
  public readonly id: string;

  constructor() {
    this.id = nextId();
  }
}
