import { IState } from '../state';
import { IEvent } from './';

async function renameModel(oldName: string, newName: string) {
  const log = console.log;

  const response = await fetch('/model-renamer', {
    body: JSON.stringify({ old: oldName, new: newName }),
    method: 'POST',
  });
  const json = await response.json();
  log(json);
}

export default class RenameModelEvent implements IEvent {
  constructor(private newName: string) { }

  public update(state: IState): IState {
    if (this.newName === '' || this.newName === state.model) return state;

    renameModel(state.model, this.newName);

    state.models[this.newName] = state.models[state.model];
    state.models[this.newName].name = this.newName;
    delete state.models[state.model];
    state.model = this.newName;
    state.tab = 0;
    return state;
  }
}
