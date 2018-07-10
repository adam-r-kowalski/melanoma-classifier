import { IModels, IState } from '../state';
import { IEvent } from './';

export default class SetModelsEvent implements IEvent {
  constructor(private models: IModels) { }

  public update(state: IState): IState {
    const model = Object.keys(this.models)[0];
    return { ...state, model, models: this.models };
  }
}
