// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import { IState } from '../state';
import { IEvent } from './';

interface IProps {
  value: string;
  layerIndex: number;
  group?: string;
  field: string;
}

export default class UpdateFieldEvent implements IEvent {
  constructor(private props: IProps) { }

  public update(state: IState): IState {
    const layer = state.models[state.model].layers[this.props.layerIndex];

    const group = this.props.group;
    const name = group || this.props.field;
    const value = Number(this.props.value);

    for (const field of layer.fields) {
      if (field.name === name) {
        if (group) {
          for (const nestedField of field.group) {
            if (nestedField.name === this.props.field) {
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
