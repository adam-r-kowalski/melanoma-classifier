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
