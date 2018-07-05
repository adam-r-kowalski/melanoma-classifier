import { IState } from '../state';
import { IEvent } from './';

export default class DeleteLayerEvent implements IEvent {
  constructor(private index: number) { }

  public update(state: IState): IState {
    state.model.layers.splice(this.index, 1);
    return state;
  }
}
