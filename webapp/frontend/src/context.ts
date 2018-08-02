// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import * as React from 'react';

import { IEvent } from './events';
import { empty, IState } from './state';

export type Dispatch = (event: IEvent) => void;

export interface IContext {
  state: IState;
  dispatch: Dispatch;
}

export const context = React.createContext<IContext>({
  dispatch: console.log,
  state: empty,
});
