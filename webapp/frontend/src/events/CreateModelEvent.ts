import counter from '../counter';
import { IState } from '../state';
import { IEvent } from './';

const nextModel = counter('Model');

export default class CreateModelEvent implements IEvent {
  public update(state: IState): IState {
    state.models[nextModel()] = { layers: [] };
    return state;
  }
}
