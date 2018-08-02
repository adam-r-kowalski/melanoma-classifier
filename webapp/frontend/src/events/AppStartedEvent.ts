// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import InitializeModelRunnerEvent from './InitializeModelRunnerEvent';
import LoadModelsEvent from './LoadModelsEvent';

export default class AppStartedEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    this.dispatch(new InitializeModelRunnerEvent(this.dispatch));
    this.dispatch(new LoadModelsEvent(this.dispatch));
    return state;
  }
}
