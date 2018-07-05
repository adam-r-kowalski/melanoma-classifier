import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import * as D from 'react-beautiful-dnd';

import { context, Dispatch } from '../context';
import DeleteLayerEvent from '../events/DeleteLayerEvent';
import { ILayer } from '../model';
import { Fields } from './Fields';

export const grid = 8;

type DraggableStyle = D.DraggingStyle | D.NotDraggingStyle;

type CSS = React.CSSProperties;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyle): CSS => ({
  background: isDragging ? 'lightgreen' : 'none',
  margin: `0 0 ${grid}px 0`,
  userSelect: 'none',
  ...draggableStyle,
});

const onClick = (dispatch: Dispatch, index: number) =>
  (event: React.MouseEvent<HTMLElement>): void => {
    dispatch(new DeleteLayerEvent(index));
    event.stopPropagation();
  };

interface IProps {
  layer: ILayer;
  index: number;
}

const Panel = (props: IProps): JSX.Element =>
  <context.Consumer>
    {({ dispatch }) =>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography>{props.layer.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {props.layer.fields ?
              <Fields fields={props.layer.fields} layerIndex={props.index} /> :
              <></>}
            <Button color="secondary" onClick={onClick(dispatch, props.index)}>
              Delete
	    </Button>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel >
    }
  </context.Consumer>;

export const Layer = (props: IProps): JSX.Element =>
  <D.Draggable draggableId={props.layer.name} index={props.index}>
    {(provided: D.DraggableProvided, snapshot: D.DraggableStateSnapshot) =>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        <Panel {...props} />
      </div>
    }
  </D.Draggable>;
