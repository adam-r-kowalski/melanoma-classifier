// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import layersList from '../layers/layersList';
import { IState } from '../state';
import { IEvent } from './';

export default class InsertLayerEvent implements IEvent {
  constructor(private layer: string) { }

  public update(state: IState): IState {
    state.models[state.model].layers.push(layersList[this.layer]());
    state.notifications.push({ message: `Layer ${this.layer} added` });
    return state;
  }
}
