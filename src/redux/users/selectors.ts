import { RootState } from "../stote";

export const selectAllUsers = (state: RootState) => state.users;
export const selectFilters = (state: RootState) => state.filters;
