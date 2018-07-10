import { IState } from '../state';
import { IEvent } from './';

export default class ChangeLearningRateEvent implements IEvent {
  constructor(private learningRate: number) { }

  public update(state: IState): IState {
    state.models[state.model].learningRate = this.learningRate;
    return state;
  }
}
