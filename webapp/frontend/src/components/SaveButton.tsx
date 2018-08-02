// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import Button from '@material-ui/core/Button';
import Save from '@material-ui/icons/Save';
import * as React from 'react';

import { context, Dispatch } from '../context';
import SaveModelEvent from '../events/SaveModelEvent';

const buttonStyle: React.CSSProperties = {
  bottom: 20,
  position: 'fixed',
  right: 20,
};

const onClick = (dispatch: Dispatch) =>
  () => dispatch(new SaveModelEvent(dispatch));

export default (): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <Button
        variant="fab"
        color="primary"
        style={buttonStyle}
        onClick={onClick(dispatch)}
      >
        <Save />
      </Button>}
  </context.Consumer>;
