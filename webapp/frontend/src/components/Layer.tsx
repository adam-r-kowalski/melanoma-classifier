import * as React from 'react';
import * as D from 'react-beautiful-dnd';

import { ILayer } from '../state';

export const grid = 8;

type DraggableStyle = D.DraggingStyle | D.NotDraggingStyle;

type CSS = React.CSSProperties;

const getItemStyle = (isDragging: boolean, draggableStyle: DraggableStyle): CSS => ({
  background: isDragging ? 'lightgreen' : 'grey',
  margin: `0 0 ${grid}px 0`,
  padding: grid * 2,
  userSelect: 'none',
  ...draggableStyle,
});

interface IProps {
  layer: ILayer;
  index: number;
}

export const Layer = (props: IProps): JSX.Element =>
  <D.Draggable draggableId={props.layer.name} index={props.index}>
    {(provided: D.DraggableProvided, snapshot: D.DraggableStateSnapshot) =>
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
      >
        {props.layer.name}
      </div>
    }
  </D.Draggable>;
