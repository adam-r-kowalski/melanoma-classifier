// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import RenameModelCompleteEvent from './RenameModelCompleteEvent';

async function renameModel(oldName: string, newName: string, dispatch: Dispatch) {
  const response = await fetch('/model-renamer', {
    body: JSON.stringify({ old: oldName, new: newName }),
    method: 'POST',
  });
  const json = await response.json();
  dispatch(new RenameModelCompleteEvent(oldName, newName));
}

export default class RenameModelEvent implements IEvent {
  constructor(private newName: string, private dispatch: Dispatch) { }

  public update(state: IState): IState {
    if (this.newName === '' || this.newName === state.model) return state;

    renameModel(state.model, this.newName, this.dispatch);

    state.models[this.newName] = state.models[state.model];
    state.models[this.newName].name = this.newName;
    delete state.models[state.model];
    state.model = this.newName;
    state.tab = 0;
    return state;
  }
}
