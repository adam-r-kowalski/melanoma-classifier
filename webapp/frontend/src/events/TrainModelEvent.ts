// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class TrainModelEvent implements IEvent {
  constructor(private epochs: number) { }

  public update(state: IState): IState {
    state.modelRunner.socket.emit('message', JSON.stringify({
      epochs: this.epochs,
      model: state.model,
    }));
    return state;
  }
}
