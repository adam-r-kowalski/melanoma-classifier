import counter from '../counter';
import { IField, ILayer } from '../model';

const name = 'Convolution 2D';
const nextId = counter(name);

export default class Convolution2D implements ILayer {
  public readonly name = name;
  public readonly id: string;

  public fields: IField[] = [
    {
      name: 'filters',
      value: 5,
    },
    {
      group: [
        {
          name: 'width',
          value: 3,
        },
        {
          name: 'height',
          value: 3,
        },
      ],
      name: 'kernel',
    },
    {
      group: [
        {
          name: 'width',
          value: 3,
        },
        {
          name: 'height',
          value: 3,
        },
      ],
      name: 'strides',
    },
  ];

  constructor() {
    this.id = nextId();
  }
}
