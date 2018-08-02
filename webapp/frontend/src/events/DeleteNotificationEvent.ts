// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

export default class DeleteNotificationEvent implements IEvent {
  public update(state: IState): IState {
    state.notifications.splice(0, 1);
    return state;
  }
}
