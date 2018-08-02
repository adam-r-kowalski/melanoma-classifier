// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Dropout';
const nextId = counter(name);

export default class Dropout implements ILayer {
  public readonly name = name;
  public readonly id: string;

  public fields: IField[] = [
    {
      name: 'rate',
      value: 0.3,
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
