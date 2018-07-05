import { IState } from '../state';

export interface IEvent {
  update: (state: IState) => IState;
}
