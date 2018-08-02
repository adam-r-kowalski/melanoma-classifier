// Copyright (c) 2018 Adam Kowalski
// This code is available under the "Apache License 2.0"
// Please see the file COPYING in this distribution for license terms.

import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Close from '@material-ui/icons/Close';
import * as React from 'react';

import { context, Dispatch, IContext } from '../context';
import DeleteNotificationEvent from '../events/DeleteNotificationEvent';

const deleteNotification = (dispatch: Dispatch) =>
  () => dispatch(new DeleteNotificationEvent());

const Notification = (ctx: IContext): JSX.Element =>
  <Snackbar
    anchorOrigin={{
      horizontal: 'left',
      vertical: 'bottom',
    }}
    open={true}
    autoHideDuration={6000}
    onClose={deleteNotification(ctx.dispatch)}
    message={<span>{ctx.state.notifications[0].message}</span>}
    action={[
      <IconButton
        key={'icon-button'}
        color="inherit"
        onClick={deleteNotification(ctx.dispatch)}
      >
        <Close />
      </IconButton>,
    ]}
  />;

export default (): JSX.Element =>
  <context.Consumer>
    {ctx => ctx.state.notifications.length > 0 ?
      <Notification {...ctx} /> : <></>
    }
  </context.Consumer>;
