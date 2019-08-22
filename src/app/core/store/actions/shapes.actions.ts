import { Action } from '@ngrx/store';

import { DragPosition, Shape } from '../reducers/shapes.reducers';

export const SHAPES_ADD_SHAPE = '[Shapes] Add shape';
export const SHAPES_SELECT_SHAPE = '[Shapes] Select shape';
export const SHAPES_REMOVE_SHAPE = '[Shapes] Remove shape';
export const SHAPES_SAVE_SHAPE_POSITION = '[Shapes] Save shape position';
export const SHAPES_SAVE_SHAPE_COLOR = '[Shapes] Save shape color';
export const SHAPES_CHANGE_SHAPE_COLOR_HISTORY = '[Shapes] Change shape color history';

export class ShapesAddShape implements Action {
  readonly type = SHAPES_ADD_SHAPE;

  constructor(public payload: Shape) {
  }
}

export class ShapesSelectShape implements Action {
  readonly type = SHAPES_SELECT_SHAPE;

  constructor(public payload: number) {
  }
}

export class ShapesRemoveShape implements Action {
  readonly type = SHAPES_REMOVE_SHAPE;

  constructor(public payload: number) {
  }
}

export class ShapesSaveShapePosition implements Action {
  readonly type = SHAPES_SAVE_SHAPE_POSITION;

  constructor(public payload: DragPosition) {
  }
}

export class ShapesSaveShapeColor implements Action {
  readonly type = SHAPES_SAVE_SHAPE_COLOR;

  constructor(public payload: string) {
  }
}

export class ShapesChangeShapeColorHistory implements Action {
  readonly type = SHAPES_CHANGE_SHAPE_COLOR_HISTORY;
}

export type ShapesActions = ShapesAddShape
  | ShapesSelectShape
  | ShapesRemoveShape
  | ShapesSaveShapePosition
  | ShapesSaveShapeColor
  | ShapesChangeShapeColorHistory;

