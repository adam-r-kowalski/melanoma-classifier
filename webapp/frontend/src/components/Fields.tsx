// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import { context } from '../context';
import UpdateFieldEvent from '../events/UpdateFieldEvent';
import { IField, INestedField } from '../model';

interface INestedProps {
  group: string;
  field: INestedField;
  layerIndex: number;
}

const Nested = (props: INestedProps): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <TextField
        label={`${props.group} ${props.field.name}`}
        value={props.field.value}
        style={{ marginRight: 10 }}
        type="number"
        onMouseDown={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        onChange={e => dispatch(new UpdateFieldEvent({
          field: props.field.name,
          group: props.group,
          layerIndex: props.layerIndex,
          value: e.target.value,
        }))}
      />
    }
  </context.Consumer>;

interface IFieldProps {
  field: IField;
  layerIndex: number;
}

const Group = (props: IFieldProps): JSX.Element =>
  <>
    {props.field.group.map((field, index) =>
      <Nested
        key={index}
        group={props.field.name}
        field={field}
        layerIndex={props.layerIndex}
      />)}
  </>;

const Single = (props: IFieldProps): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <TextField
        label={props.field.name}
        value={props.field.value}
        type="number"
        onMouseDown={e => e.stopPropagation()}
        onKeyDown={e => e.stopPropagation()}
        onChange={e => dispatch(new UpdateFieldEvent({
          field: props.field.name,
          layerIndex: props.layerIndex,
          value: e.target.value,
        }))}
      />
    }
  </context.Consumer>;

const Field = (props: IFieldProps): JSX.Element =>
  <>
    <ListItem>
      {props.field.group ?
        <Group {...props} /> :
        <Single {...props} />}
    </ListItem>
    <Divider />
  </>;

interface IFieldsProps {
  fields: IField[];
  layerIndex: number;
}

export const Fields = (props: IFieldsProps): JSX.Element =>
  <List style={{ width: '100%' }}>
    {props.fields.map((field, index) =>
      <Field
        key={index}
        field={field}
        layerIndex={props.layerIndex}
      />)}
  </List>;
