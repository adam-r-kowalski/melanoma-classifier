import counter from '../counter';
import { ILayer } from '../model';

const name = 'Sigmoid';
const nextId = counter(name);

export default class Sigmoid implements ILayer {
  public readonly name = name;
  public readonly id: string;

  constructor() {
    this.id = nextId();
  }
}
