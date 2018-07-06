import { IState } from '../state';
import { IEvent } from './';

export default class DeleteModelEvent implements IEvent {
  constructor(private name: string) { }

  public update(state: IState): IState {
    if (this.name !== state.model) return state;

    delete state.models[state.model];
    state.model = Object.keys(state.models)[0];
    return state;
  }
}
