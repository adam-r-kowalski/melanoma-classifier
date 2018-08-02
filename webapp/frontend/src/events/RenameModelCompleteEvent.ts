// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class RenameModelCompleteEvent implements IEvent {
  constructor(private oldName: string, private newName: string) { }

  public update(state: IState): IState {
    state.notifications.push({ message: `Model ${this.oldName} renamed to ${this.newName}` });
    return state;
  }
}
