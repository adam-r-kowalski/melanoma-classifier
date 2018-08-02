// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import ModelRunnerReadyEvent from './ModelRunnerReadyEvent';

export default class InitializeModelRunnerEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    state.modelRunner.socket.on(
      'connect',
      () => this.dispatch(new ModelRunnerReadyEvent(this.dispatch)));
    return state;

  }
}
