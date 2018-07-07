import counter from '../counter';
import { IState } from '../state';
import { IEvent } from './';

const nextModel = counter('Model');

export default class CreateModelEvent implements IEvent {
  public update(state: IState): IState {
    const name = nextModel();
    state.models[name] = { name, layers: [] };
    return state;
  }
}
