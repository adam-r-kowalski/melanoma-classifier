import { IState } from '../state';
import { IEvent } from './';
import layersList from '../layers/layersList';

export default class InsertLayerEvent implements IEvent {
  constructor(private layer: string) { }

  public update(state: IState): IState {
    state.models[state.model].layers.push(layersList[this.layer]());
    return state;
  }
}
