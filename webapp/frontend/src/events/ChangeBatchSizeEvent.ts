// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class ChangeBatchSizeEvent implements IEvent {
  constructor(private batchSize: number) { }

  public update(state: IState): IState {
    state.models[state.model].batchSize = this.batchSize;
    return state;
  }
}
