import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';

import { context, Dispatch } from '../context';
import layersList from '../layers/layersList';
import InsertLayerEvent from '../events/InsertLayerEvent';

const style: React.CSSProperties = {
  margin: '10px auto',
  width: 500,
};

const onClick = (dispatch: Dispatch, layer: string) =>
  () => dispatch(new InsertLayerEvent(layer));

export const NewLayer = (): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <div style={style}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <Typography>New Layer</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List style={{ width: '100%' }}>
              {Object.keys(layersList).map(name =>
                <ListItem button key={name} onClick={onClick(dispatch, name)}>
                  <ListItemText primary={name} />
                </ListItem>)}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel >
      </div>
    }
  </context.Consumer>;
