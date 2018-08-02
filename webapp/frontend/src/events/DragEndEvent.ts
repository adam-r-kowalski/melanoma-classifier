// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class DragEndEvent implements IEvent {
  constructor(private begin: number, private end: number) { }

  public update(state: IState): IState {
    const layers = state.models[state.model].layers;
    const [removed] = layers.splice(this.begin, 1);
    layers.splice(this.end, 0, removed);
    return state;
  }
}
