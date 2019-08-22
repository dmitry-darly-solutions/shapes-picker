import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromShapesReducer from '../reducers/shapes.reducers';

export const selectShapes = createFeatureSelector<fromShapesReducer.ShapesState>(
  'shapes',
);

export const getAllShapes = createSelector(
  selectShapes,
  fromShapesReducer.selectShapes,
);

export const getSelectedShape = createSelector(
  selectShapes,
  fromShapesReducer.selectSelectedShape,
);

export const getSelectedShapePosition = createSelector(
  selectShapes,
  fromShapesReducer.selectSelectedShapePosition,
);

export const getSelectedShapeColor = createSelector(
  selectShapes,
  fromShapesReducer.selectSelectedShapeColor,
);

export const getSelectedShapeColorHistory = createSelector(
  selectShapes,
  fromShapesReducer.selectSelectedShapeColorHistory,
);

