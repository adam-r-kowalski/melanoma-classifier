import { IState } from '../state';
import { IEvent } from './';

export default class DeleteNotificationEvent implements IEvent {
  public update(state: IState): IState {
    state.notifications.splice(0, 1);
    return state;
  }
}
