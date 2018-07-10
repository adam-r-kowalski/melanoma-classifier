import { IState } from '../state';
import { IEvent } from './';

async function trainModel() {
  const webSocket = new WebSocket('/model-runner');
  webSocket.send('Hello World');
}

export default class TrainModelEvent implements IEvent {
  public update(state: IState): IState {
    trainModel();
    return state;
  }
}