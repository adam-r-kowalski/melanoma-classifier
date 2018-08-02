// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class ToggleDrawerEvent implements IEvent {
  constructor(private open: boolean) { }

  public update(state: IState): IState {
    return { ...state, drawer: this.open };
  }
}
