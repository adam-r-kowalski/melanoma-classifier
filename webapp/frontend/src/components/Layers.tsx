import * as React from 'react';
import * as D from 'react-beautiful-dnd';

import { context, Dispatch, IContext } from '../context';
import { DragEndEvent } from '../event';
import { ILayer } from '../model';
import { grid, Layer } from './Layer';

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  margin: '0 auto',
  padding: grid,
  width: 500,
});

const onDragEnd = (dispatch: Dispatch) =>
  (result: D.DropResult, provided: D.HookProvided): void => {
    if (!result.source || !result.destination) return;

    const begin = result.source.index;
    const end = result.destination.index;

    if (begin === end) return;
    dispatch(new DragEndEvent(begin, end));
  };

export const Layers = (): JSX.Element =>
  <context.Consumer>
    {({ state, dispatch }: IContext) =>
      <D.DragDropContext onDragEnd={onDragEnd(dispatch)}>
        <D.Droppable droppableId="droppable">
          {(provided: D.DroppableProvided, snapshot: D.DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.model.layers.map((layer: ILayer, index: number) =>
                <Layer key={layer.name} layer={layer} index={index} />)}
              {provided.placeholder}
            </div>
          )}
        </D.Droppable>
      </D.DragDropContext>
    }
  </context.Consumer>;
