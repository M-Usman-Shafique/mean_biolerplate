// src/app/store/app.state.ts
import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from './counter/counter.reducer';

export interface AppState {
  counter: number;
}

export const appReducers: ActionReducerMap<AppState> = {
  counter: counterReducer
};
