import { Dispatch } from '../context';
import { IState, Message } from '../state';
import { IEvent } from './';
import ModelRunnerMessageEvent from './ModelRunnerMessageEvent';

export default class ModelRunnerReadyEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    state.modelRunner.ready = true;
    state.modelRunner.socket.on(
      'message',
      (messageJson: string) => {
        const message = JSON.parse(messageJson) as Message;
        this.dispatch(new ModelRunnerMessageEvent(message));
      });
    return state;
  }
}
