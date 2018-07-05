import { IState } from '../state';
import { IEvent } from './';

export default class ChangeTabEvent implements IEvent {
  constructor(private tab: number) { }

  public update(state: IState): IState {
    return { ...state, tab: this.tab };
  }
}
