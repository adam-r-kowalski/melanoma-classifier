import { IPrediction, IState } from '../state';
import { IEvent } from './';

export default class SetPredictionsEvent implements IEvent {
  constructor(private predictions: IPrediction[]) { }

  public update(state: IState): IState {
    return { ...state, predictions: this.predictions };
  }
}
