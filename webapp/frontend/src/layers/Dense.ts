import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Dense';
const nextId = counter(name);

export default class Dense implements ILayer {
  public readonly name = name;
  public readonly id: string;
  public units: number = 1;

  public fields: IField[] = [
    {
      name: 'units',
      value: 1,
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
