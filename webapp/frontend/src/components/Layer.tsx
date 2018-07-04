import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import * as React from 'react';
import * as D from 'react-beautiful-dnd';

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

interface IProps {
  layer: ILayer;
  index: number;
}

const expandable = (props: IProps): JSX.Element =>
  <ExpansionPanel>
    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
      <Typography>{props.layer.name}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Fields fields={props.layer.fields} />
    </ExpansionPanelDetails>
  </ExpansionPanel>;

const fixed = (props: IProps): JSX.Element =>
  <ExpansionPanel expanded={false}>
    <ExpansionPanelSummary>
      <Typography>{props.layer.name}</Typography>
    </ExpansionPanelSummary>
  </ExpansionPanel>;

export const Layer = (props: IProps): JSX.Element =>
  <D.Draggable draggableId={props.layer.name} index={props.index}>
    {(provided: D.DraggableProvided, snapshot: D.DraggableStateSnapshot) =>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {props.layer.fields ? expandable(props) : fixed(props)}
      </div>
    }
  </D.Draggable>;
