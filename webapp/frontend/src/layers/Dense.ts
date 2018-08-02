// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Dense';
const nextId = counter(name);

export default class Dense implements ILayer {
  public readonly name = name;
  public readonly id: string;
  public units: number = 1;

  public fields: IField[] = [
    {
      name: 'units',
      value: 1,
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
