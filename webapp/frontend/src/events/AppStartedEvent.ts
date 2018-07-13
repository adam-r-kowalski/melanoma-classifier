import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import InitializeModelRunnerEvent from './InitializeModelRunnerEvent';
import LoadModelsEvent from './LoadModelsEvent';

export default class AppStartedEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    this.dispatch(new InitializeModelRunnerEvent(this.dispatch));
    this.dispatch(new LoadModelsEvent(this.dispatch));
    return state;
  }
}
