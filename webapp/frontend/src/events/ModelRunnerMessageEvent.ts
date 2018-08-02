// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IRunning, IState, Message } from '../state';
import { IEvent } from './';

const onStarted = (state: IState): IState => {
  state.notifications.push({ message: `Training ${state.model} Started` });
  state.training.train = {};
  state.training.test = {};
  return state;
};

const onRunning = (state: IState, message: IRunning): IState => {
  const { accuracy, iteration, loss } = message;
  const epochs = message.train ? state.training.train : state.training.test;
  epochs[message.epoch] = {
    accuracy: message.accuracy,
    iteration: message.iteration,
    loss: message.loss,
  };
  return state;
};

const onFinished = (state: IState): IState => {
  state.notifications.push({ message: `Training ${state.model} Finished` });
  return state;
};

export default class ModelRunnerMessageEvent implements IEvent {
  constructor(private message: Message) { }

  public update(state: IState): IState {
    switch (this.message.message) {
      case 'started': return onStarted(state);
      case 'running': return onRunning(state, this.message as IRunning);
      case 'finished': return onFinished(state);
    }
  }
}
