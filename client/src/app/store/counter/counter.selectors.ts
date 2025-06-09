// src/app/store/counter/counter.selectors.ts
import { createFeatureSelector } from "@ngrx/store";

export const selectCounter = createFeatureSelector<number>("counter");
