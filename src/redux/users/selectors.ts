import { RootState } from "../stote";

export const selectAllUsers = (state: RootState) => state.users;
export const selectFilters = (state: RootState) => state.filters;
export const selectSort = (state: RootState) => state.sort;
export const selectError = (state: RootState) => state.error;
export const selectIsLoading = (state: RootState) => state.isLoading;
