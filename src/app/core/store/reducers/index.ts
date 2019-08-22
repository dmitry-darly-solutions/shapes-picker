import { ActionReducerMap } from '@ngrx/store';

import * as fromShapes from './shapes.reducers';

export interface State {
  shapes: fromShapes.ShapesState;
}

export const reducers: ActionReducerMap<State> = {
  shapes: fromShapes.shapesReducer,
};
