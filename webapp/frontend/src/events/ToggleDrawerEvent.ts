import { IState } from '../state';
import { IEvent } from './';

export default class ToggleDrawerEvent implements IEvent {
  constructor(private open: boolean) { }

  public update(state: IState): IState {
    return { ...state, drawer: this.open };
  }
}
