import * as React from 'react';
import * as D from 'react-beautiful-dnd';

import { context, Dispatch, IContext } from '../context';
import DragEndEvent from '../events/DragEndEvent';
import { ILayer, IModel } from '../model';
import { grid, Layer } from './Layer';

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : 'none',
  margin: '10px auto',
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
        <D.Droppable droppableId={`droppable ${state.model}`}>
          {(provided: D.DroppableProvided, snapshot: D.DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.models[state.model].layers.map((layer: ILayer, index: number) =>
                <Layer key={layer.id} layer={layer} index={index} model={state.model} />)}
              {provided.placeholder}
            </div>
          )}
        </D.Droppable>
      </D.DragDropContext>
    }
  </context.Consumer>;
