import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import * as React from 'react';

import { context, Dispatch } from '../context';
import ChangeTabEvent from '../events/ChangeTabEvent';
import { Layers } from './Layers';

const onChange = (dispatch: Dispatch) =>
  (event: React.ChangeEvent<{}>, value: number) =>
    dispatch(new ChangeTabEvent(value));

export const Model = (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <>
        <Tabs centered value={state.tab} onChange={onChange(dispatch)}>
          <Tab label="Layers" />
          <Tab label="Training" />
          <Tab label="Prediction" />
        </Tabs>
        <Layers />
      </>
    }
  </context.Consumer>;
