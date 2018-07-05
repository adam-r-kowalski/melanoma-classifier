import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Dropout';
const nextId = counter(name);

export default class Dropout implements ILayer {
  public readonly name = name;
  public readonly id: string;

  public fields: IField[] = [
    {
      name: 'rate',
      value: 0.3,
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
