import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import { IField, INestedField } from '../model';

interface INestedProps {
  group: string;
  field: INestedField;
}

const Nested = (props: INestedProps): JSX.Element =>
  <TextField label={`${props.group} ${props.field.name}`}
    value={props.field.value}
    style={{ marginRight: 10 }}
  />;

interface IFieldProps {
  field: IField;
}

const Group = (props: IFieldProps): JSX.Element =>
  <>
    {props.field.group.map((field, index) =>
      <Nested key={index} group={props.field.name} field={field} />)}
  </>;

const Single = (props: IFieldProps): JSX.Element =>
  <TextField label={props.field.name} value={props.field.value} />;

const Field = (props: IFieldProps): JSX.Element =>
  <>
    <ListItem>
      {props.field.group ? <Group {...props} /> : <Single {...props} />}
    </ListItem>
    <Divider />
  </>;

interface IFieldsProps {
  fields: IField[];
}

export const Fields = (props: IFieldsProps): JSX.Element =>
  <List>
    {props.fields.map((field, index) => <Field key={index} field={field} />)}
  </List>;
