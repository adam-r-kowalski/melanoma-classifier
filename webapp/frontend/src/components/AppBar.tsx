// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import * as React from 'react';

import { context } from '../context';
import ToggleDrawerEvent from '../events/ToggleDrawerEvent';

export default () =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={_ => dispatch(new ToggleDrawerEvent(true))}
          >
            <Menu />
          </IconButton>
          <Typography variant="title" color="inherit">{state.model}</Typography>
        </Toolbar>
      </AppBar>
    }
  </context.Consumer>;
