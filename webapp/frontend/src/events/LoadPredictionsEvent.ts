import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import SetPredictionsEvent from './SetPredictionsEvent';

async function loadPredictions(state: IState, dispatch: Dispatch) {
  const response = await fetch('/model-predictor', {
    body: JSON.stringify(state.model),
    method: 'POST',
  });
  const predictions = await response.json();
  dispatch(new SetPredictionsEvent(predictions));
}

export default class LoadPredictionsEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    loadPredictions(state, this.dispatch);
    return state;
  }
}
