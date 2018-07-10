import { IState } from '../state';
import { IEvent } from './';

async function deleteModel(model: string) {
  const log = console.log;

  const response = await fetch('/model-deleter', {
    body: JSON.stringify(model),
    method: 'POST',
  });
  const json = await response.json();
  log(json);
}

export default class DeleteModelEvent implements IEvent {
  constructor(private name: string) { }

  public update(state: IState): IState {
    if (this.name !== state.model) return state;

    deleteModel(state.model);

    delete state.models[state.model];
    state.model = Object.keys(state.models)[0];
    state.tab = 0;
    return state;
  }
}
