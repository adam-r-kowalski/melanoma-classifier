import counter from '../counter';
import { optimizers } from '../model';
import { IState } from '../state';
import { IEvent } from './';

const nextModel = counter('Model');

export default class CreateModelEvent implements IEvent {
  public update(state: IState): IState {
    const name = nextModel();
    state.models[name] = {
      name,
      batchSize: 32,
      layers: [],
      learningRate: 0.01,
      optimizer: optimizers[0],
    };
    return state;
  }
}
