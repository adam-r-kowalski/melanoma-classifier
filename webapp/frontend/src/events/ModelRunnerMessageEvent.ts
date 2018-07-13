import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';

export default class ModelRunnerMessageEvent implements IEvent {
  constructor(private dispatch: Dispatch, private message: any) { }

  public update(state: IState): IState {
    console.log('model runner message event', this.message);
    return state;
  }
}
