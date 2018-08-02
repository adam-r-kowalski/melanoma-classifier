// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Convolution 2D';
const nextId = counter(name);

export default class Convolution2D implements ILayer {
  public readonly name = name;
  public readonly id: string;

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
          value: 1,
        },
        {
          name: 'height',
          value: 1,
        },
      ],
      name: 'strides',
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
