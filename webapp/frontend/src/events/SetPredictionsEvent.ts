// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IPrediction, IState } from '../state';
import { IEvent } from './';

export default class SetPredictionsEvent implements IEvent {
  constructor(private predictions: IPrediction[]) { }

  public update(state: IState): IState {
    return { ...state, predictions: this.predictions };
  }
}
