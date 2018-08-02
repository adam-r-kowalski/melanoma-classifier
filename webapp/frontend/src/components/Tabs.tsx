// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import { context, Dispatch } from '../context';
import ChangeTabEvent from '../events/ChangeTabEvent';

const onChange = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<{}>, value: number) =>
    dispatch(new ChangeTabEvent(value));

export default (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <Tabs centered value={state.tab} onChange={onChange(dispatch)}>
        <Tab label="Layers" />
        <Tab label="Training" />
        <Tab label="Prediction" />
        <Tab label="Settings" />
      </Tabs>
    }
  </context.Consumer>;
