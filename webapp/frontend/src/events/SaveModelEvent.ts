import { IState } from '../state';
import { IEvent } from './';

async function saveModel(state: IState) {
  const log = console.log;

  const response = await fetch('/model-saver', {
    body: JSON.stringify(state.models[state.model]),
    method: 'POST',
  });
  const json = await response.json();
  log(json);
}

export default class SaveModelEvent implements IEvent {
  public update(state: IState): IState {
    saveModel(state);
    return state;
  }
}
