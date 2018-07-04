import { IState } from './state';

export interface IEvent {
  update: (state: IState) => IState;
}

export class DragEndEvent implements IEvent {
  constructor(private begin: number, private end: number) { }

  public update(state: IState): IState {
    const layers = state.model.layers;
    const [removed] = layers.splice(this.begin, 1);
    layers.splice(this.end, 0, removed);
    return state;
  }
}

interface IUpdateField {
  value: string;
  layerIndex: number;
  group?: string;
  field: string;
}

export class UpdateField implements IEvent {
  constructor(private updateField: IUpdateField) { }

  public update(state: IState): IState {
    const layer = state.model.layers[this.updateField.layerIndex];

    const group = this.updateField.group;
    const name = group || this.updateField.field;
    const value = Number(this.updateField.value);

    const log = console.log;
    for (const field of layer.fields) {
      if (field.name === name) {
        if (group) {
          for (const nestedField of field.group) {
            if (nestedField.name === this.updateField.field) {
              nestedField.value = value;
            }
          }
        } else {
          field.value = value;
        }
        break;
      }
    }

    return state;
  }
}
