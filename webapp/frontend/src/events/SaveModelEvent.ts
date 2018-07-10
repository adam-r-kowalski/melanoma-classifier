import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import SaveModelCompleteEvent from './SaveModelCompleteEvent';

async function saveModel(state: IState, dispatch: Dispatch) {
  const name = state.model;
  const response = await fetch('/model-saver', {
    body: JSON.stringify(state.models[name]),
    method: 'POST',
  });
  const json = await response.json();
  dispatch(new SaveModelCompleteEvent(name));
}

export default class SaveModelEvent implements IEvent {
  constructor(private dispatch: Dispatch) { }

  public update(state: IState): IState {
    saveModel(state, this.dispatch);
    return state;
  }
}
