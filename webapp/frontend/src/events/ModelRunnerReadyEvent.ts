// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IState, Message } from '../state';
import { IEvent } from './';
import ModelRunnerMessageEvent from './ModelRunnerMessageEvent';

export default class ModelRunnerReadyEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    state.modelRunner.ready = true;
    state.modelRunner.socket.on(
      'message',
      (messageJson: string) => {
        const message = JSON.parse(messageJson) as Message;
        this.dispatch(new ModelRunnerMessageEvent(message));
      });
    return state;
  }
}
