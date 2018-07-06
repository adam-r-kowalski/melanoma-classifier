import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Add from '@material-ui/icons/Add';
import * as React from 'react';

import { context, Dispatch } from '../context';
import ChangeModelEvent from '../events/ChangeModelEvent';
import CreateModelEvent from '../events/CreateModelEvent';
import ToggleDrawerEvent from '../events/ToggleDrawerEvent';

const closeDrawer = (dispatch: Dispatch) =>
  () => dispatch(new ToggleDrawerEvent(false));

const changeModel = (dispatch: Dispatch, name: string) =>
  () => dispatch(new ChangeModelEvent(name));

const createModel = (dispatch: Dispatch) =>
  () => dispatch(new CreateModelEvent());

interface IProps {
  dispatch: Dispatch;
}

const CreateModel = (props: IProps): JSX.Element =>
  <ListItem button onClick={createModel(props.dispatch)}>
    <ListItemIcon><Add /></ListItemIcon>
    <ListItemText primary="Create Model" />
  </ListItem>;

export default (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }) =>
      <Drawer open={state.drawer} onClose={closeDrawer(dispatch)}>
        <CreateModel dispatch={dispatch} />
        <List style={{ width: 250 }} subheader={<ListSubheader>Models</ListSubheader>}>
          {Object.keys(state.models).map(name =>
            <ListItem button key={name} onClick={changeModel(dispatch, name)}>
              <ListItemText primary={name} />
            </ListItem>)}
        </List>
      </Drawer>
    }
  </context.Consumer>;
