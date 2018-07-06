import layersList from '../layers/layersList';
import { IState } from '../state';
import { IEvent } from './';

export default class InsertLayerEvent implements IEvent {
  constructor(private layer: string) { }

  public update(state: IState): IState {
    state.models[state.model].layers.push(layersList[this.layer]());
    return state;
  }
}
