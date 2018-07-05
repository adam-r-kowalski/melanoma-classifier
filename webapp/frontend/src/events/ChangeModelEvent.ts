import { IState } from '../state';
import { IEvent } from './';

export default class ChangeModelEvent implements IEvent {
  constructor(private model: string) { }

  public update(state: IState): IState {
    return { ...state, model: this.model, drawer: false };
  }
}
