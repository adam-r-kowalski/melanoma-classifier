import { IState } from '../state';
import { IEvent } from './';

export default class RenameModelEvent implements IEvent {
  constructor(private newName: string) { }

  public update(state: IState): IState {
    if (this.newName === '' || this.newName === state.model) return state;

    state.models[this.newName] = state.models[state.model];
    delete state.models[state.model];
    state.model = this.newName;
    return state;
  }
}
