import { IState } from '../state';
import { IEvent } from './';

export default class ChangeOptimizerEvent implements IEvent {
  constructor(private optimizer: string) { }

  public update(state: IState): IState {
    state.models[state.model].optimizer = this.optimizer;
    return state;
  }
}
