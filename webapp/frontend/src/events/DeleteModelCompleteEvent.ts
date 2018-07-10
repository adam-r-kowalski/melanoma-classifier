import { IState } from '../state';
import { IEvent } from './';

export default class DeleteModelCompleteEvent implements IEvent {
  constructor(private name: string) { }

  public update(state: IState): IState {
    state.notifications.push({ message: `Model ${this.name} deleted` });
    return state;
  }
}
