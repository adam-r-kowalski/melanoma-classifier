import counter from '../counter';
import { ILayer } from '../model';

const name = 'Flatten';
const nextId = counter(name);

export default class Flatten implements ILayer {
  public readonly name = name;
  public readonly id: string;

  constructor() {
    this.id = nextId();
  }
}
