import { IModels, IState } from '../state';
import { IEvent } from './';

export default class SetModelsEvent implements IEvent {
  constructor(private models: IModels) { }

  public update(state: IState): IState {
    return { ...state, models: this.models };
  }
}
