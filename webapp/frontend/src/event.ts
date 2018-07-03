import { IState } from './state';

export interface IEvent {
  update: (state: IState) => IState;
}

export class DragEndEvent implements IEvent {
  constructor(private begin: number, private end: number) { }

  public update(state: IState): IState {
    const layers = state.model.layers;
    const [removed] = layers.splice(this.begin, 1);
    layers.splice(this.end, 0, removed);
    return state;
  }
}
