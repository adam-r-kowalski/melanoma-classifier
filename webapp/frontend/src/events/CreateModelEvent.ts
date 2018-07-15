import counter from '../counter';
import { optimizers } from '../model';
import { IState } from '../state';
import { IEvent } from './';

const nextModel = counter('Model');

export default class CreateModelEvent implements IEvent {
  constructor(private changeModel: boolean = false) { }

  public update(state: IState): IState {
    const name = nextModel();
    state.models[name] = {
      name,
      batchSize: 32,
      layers: [],
      learningRate: 0.01,
      optimizer: optimizers[0],
    };

    if (this.changeModel) {
      state.model = name;
      state.drawer = false;
    }

    return state;
  }
}
