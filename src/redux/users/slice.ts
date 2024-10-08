import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./operations";
import { IUser } from "../../types";

export interface IUserInitialState {
  users: IUser[];
  filters: { name: string; username: string; email: string; phone: string };
  sort: { name: keyof IUser; asc: boolean };
  isLoading: boolean;
  error: SerializedError | null;
}

const userInitialState: IUserInitialState = {
  users: [],
  filters: { name: "", username: "", email: "", phone: "" },
  sort: { name: "id", asc: false },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setFilters: (state, { payload: { name, username, email, phone } }) => {
      state.filters = { name, username, email, phone };
    },
    setSort: (state, { payload }) => {
      state.sort = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }),
});

export const { setFilters, setSort } = userSlice.actions;
export const userReducer = userSlice.reducer;
