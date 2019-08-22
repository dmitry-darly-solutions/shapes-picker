import * as fromActions from '../actions/shapes.actions';

export interface DragPosition {
  x: number;
  y: number;
}

export interface Shape {
  id: number;
  class: string;
  dragPosition: DragPosition;
  color: string;
  colorsHistory?: string[];
}

export interface ShapesState {
  selectedShape: Shape;
  shapes: Shape[];
  lastId: number;
}

export const initialState: ShapesState = {
  selectedShape: null,
  shapes: [],
  lastId: 0
};

export function shapesReducer(
  state: ShapesState = initialState,
  action: fromActions.ShapesActions,
): ShapesState {
  switch (action.type) {
    case fromActions.SHAPES_ADD_SHAPE: {
      const shapes = [...state.shapes];
      shapes.push({...action.payload, id: state.lastId});
      const selectedShape = !state.selectedShape ? shapes[0] : state.selectedShape;
      const lastId = state.lastId + 1;
      return {...state, shapes, selectedShape, lastId};
    }

    case fromActions.SHAPES_SELECT_SHAPE: {
      const selectedShape = state.shapes.find(shape => shape.id === action.payload);
      return {...state, selectedShape};
    }

    case fromActions.SHAPES_REMOVE_SHAPE: {
      const shapes = [...state.shapes];
      const selectedShape = state.selectedShape.id === action.payload ? null : state.selectedShape;
      const index = shapes.findIndex(shape => shape.id === action.payload);
      shapes.splice(index, 1);
      return {...state, shapes, selectedShape};
    }

    case fromActions.SHAPES_SAVE_SHAPE_POSITION: {
      const selectedShape = {...state.selectedShape};
      selectedShape.dragPosition = action.payload;
      return {...state, selectedShape};
    }

    case fromActions.SHAPES_SAVE_SHAPE_COLOR: {
      if (!state.selectedShape) {
        return state;
      }
      const selectedShape = {...state.selectedShape};
      selectedShape.color = action.payload;
      selectedShape.colorsHistory.push(action.payload);
      return {...state, selectedShape};
    }

    case fromActions.SHAPES_CHANGE_SHAPE_COLOR_HISTORY: {
      const selectedShape = {...state.selectedShape};
      selectedShape.colorsHistory.pop();
      selectedShape.color = selectedShape.colorsHistory[selectedShape.colorsHistory.length - 1];
      return {...state, selectedShape};
    }

    default:
      return state;
  }
}

export const selectShapes = (state: ShapesState) => state.shapes;
export const selectSelectedShape = (state: ShapesState) => state.selectedShape;
export const selectSelectedShapeColor = (state: ShapesState) => state.selectedShape && state.selectedShape.color;
export const selectSelectedShapePosition = (state: ShapesState) => state.selectedShape && state.selectedShape.dragPosition;
export const selectSelectedShapeColorHistory = (state: ShapesState) => state.selectedShape && state.selectedShape.colorsHistory;
