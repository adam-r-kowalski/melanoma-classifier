// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';

export interface IEvent {
  update: (state: IState) => IState;
}
