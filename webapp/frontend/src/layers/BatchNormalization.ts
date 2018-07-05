import counter from '../counter';
import { ILayer } from '../model';

const name = 'Batch Normalizataion';
const nextId = counter(name);

export default class BatchNormalization implements ILayer {
  public readonly name = name;
  public readonly id: string;

  constructor() {
    this.id = nextId();
  }
}
