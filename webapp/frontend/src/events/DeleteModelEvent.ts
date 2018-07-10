import { Dispatch } from '../context';
import { IState } from '../state';
import { IEvent } from './';
import DeleteModelCompleteEvent from './DeleteModelCompleteEvent';

async function deleteModel(model: string, dispatch: Dispatch) {
  const response = await fetch('/model-deleter', {
    body: JSON.stringify(model),
    method: 'POST',
  });
  const json = await response.json();
  dispatch(new DeleteModelCompleteEvent(model));
}

export default class DeleteModelEvent implements IEvent {
  constructor(private name: string, private dispatch: Dispatch) { }

  public update(state: IState): IState {
    if (this.name !== state.model) return state;

    deleteModel(state.model, this.dispatch);

    delete state.models[state.model];
    state.model = Object.keys(state.models)[0];
    state.tab = 0;
    return state;
  }
}
