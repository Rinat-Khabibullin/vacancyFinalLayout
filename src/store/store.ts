import { configureStore } from "@reduxjs/toolkit";
import  filtersReducer  from "./filtersSlice";
import  vacanciesReducer  from "./vacanciesSlice";

export const createAppStore = () => 
  configureStore({
    reducer: {
      filters: filtersReducer,
      vacancies: vacanciesReducer,
    },
  });

  export const store = createAppStore()

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch