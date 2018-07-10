import { IState } from '../state';
import { IEvent } from './';

export default class RenameModelCompleteEvent implements IEvent {
  constructor(private oldName: string, private newName: string) { }

  public update(state: IState): IState {
    state.notifications.push({ message: `Model ${this.oldName} renamed to ${this.newName}` });
    return state;
  }
}
