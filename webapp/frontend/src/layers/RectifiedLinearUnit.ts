import counter from '../counter';
import { ILayer } from '../model';

const name = 'Rectified Linear Unit';
const nextId = counter(name);

export default class RectifiedLinearUnit implements ILayer {
  public readonly name = name;
  public readonly id: string;

  constructor() {
    this.id = nextId();
  }
}
