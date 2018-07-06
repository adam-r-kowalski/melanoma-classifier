import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import * as React from 'react';

import { context, Dispatch } from '../context';
import ChangeModelEvent from '../events/ChangeModelEvent';
import ToggleDrawerEvent from '../events/ToggleDrawerEvent';

const onClose = (dispatch: Dispatch) =>
  () => dispatch(new ToggleDrawerEvent(false));

const onClick = (dispatch: Dispatch, name: string) =>
  () => dispatch(new ChangeModelEvent(name));

export default (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <Drawer open={state.drawer} onClose={onClose(dispatch)}>
        <List style={{ width: 250 }} subheader={<ListSubheader>Models</ListSubheader>}>
          {Object.keys(state.models).map(name =>
            <ListItem button key={name} onClick={onClick(dispatch, name)}>
              <ListItemText primary={name} />
            </ListItem>)}
        </List>
      </Drawer>
    }
  </context.Consumer>;
