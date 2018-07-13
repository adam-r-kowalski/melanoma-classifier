import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import ModelRunnerMessageEvent from './ModelRunnerMessageEvent';

export default class ModelRunnerReadyEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    state.modelRunner.ready = true;
    state.modelRunner.socket.on(
      'message',
      (message: any) => this.dispatch(
        new ModelRunnerMessageEvent(this.dispatch, message)));
    return state;
  }
}
