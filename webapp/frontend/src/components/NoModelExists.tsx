// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import { context, Dispatch } from '../context';
import CreateModelEvent from '../events/CreateModelEvent';

const onClick = (dispatch: Dispatch) =>
  () => dispatch(new CreateModelEvent(true));

export default (): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <Card style={{ width: 500, margin: '10px auto' }} >
        <CardContent>
          <Typography variant="headline">
            No Model Exists
	      </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={onClick(dispatch)} color="primary">Create Model</Button>
        </CardActions>
      </Card>
    }
  </context.Consumer>;
