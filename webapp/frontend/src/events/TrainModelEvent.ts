import { IState } from '../state';
import { IEvent } from './';

export default class TrainModelEvent implements IEvent {
  constructor(private epochs: number) { }

  public update(state: IState): IState {
    state.modelRunner.socket.emit('message', JSON.stringify({
      epochs: this.epochs,
      model: state.model,
    }));
    return state;
  }
}
