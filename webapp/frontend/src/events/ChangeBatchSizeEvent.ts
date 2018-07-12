import { IState } from '../state';
import { IEvent } from './';

export default class ChangeBatchSizeEvent implements IEvent {
  constructor(private batchSize: number) { }

  public update(state: IState): IState {
    state.models[state.model].batchSize = this.batchSize;
    return state;
  }
}
