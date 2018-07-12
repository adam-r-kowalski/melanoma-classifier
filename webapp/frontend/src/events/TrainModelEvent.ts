import * as io from 'socket.io-client';

import { IState } from '../state';
import { IEvent } from './';

async function trainModel() {
  const socket = io();
  socket.on('connect', () => console.log('connected'));
  socket.on('data', () => console.log('data'));
  socket.on('disconnect', () => console.log('disconnectd'));
}

export default class TrainModelEvent implements IEvent {
  constructor(private epochs: number) { }

  public update(state: IState): IState {
    trainModel();
    return state;
  }
}
