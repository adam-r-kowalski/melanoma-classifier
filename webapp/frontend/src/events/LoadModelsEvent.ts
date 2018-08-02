// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import SetModelsEvent from './SetModelsEvent';

async function loadModels(dispatch: Dispatch) {
  const response = await fetch('/model-loader');
  const models = await response.json();
  dispatch(new SetModelsEvent(models));
}

export default class LoadModelsEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    loadModels(this.dispatch);
    return state;
  }
}
