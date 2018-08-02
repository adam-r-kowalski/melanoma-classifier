// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, Dispatch } from '../context';
import RenameModelEvent from '../events/RenameModelEvent';

interface IState {
  newName: string;
}

export default class RenameModel extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = { newName: '' };
  }

  public render() {
    return (
      <context.Consumer>
        {({ dispatch }) =>
          <Card style={{ width: 500, margin: '10px auto' }}>
            <CardContent>
              <Typography variant="headline">Rename Model</Typography>
              <TextField
                label="New Name"
                value={this.state.newName}
                onChange={this.onChange}
              />
            </CardContent>
            <CardActions>
              <Button color="primary" onClick={this.onClick(dispatch)}>Rename</Button>
            </CardActions>
          </Card>
        }
      </context.Consumer>
    );
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newName: event.target.value });
  }

  private onClick = (dispatch: Dispatch) =>
    () => {
      dispatch(new RenameModelEvent(this.state.newName, dispatch));
      this.setState({ newName: '' });
    }
}
