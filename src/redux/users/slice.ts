import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { getAllUsersThunk } from "./operations";
import { IUser } from "../../types";

export interface IUserInitialState {
  users: IUser[];
  filters: { name: string; username: string; email: string; phone: string };
  isLoading: boolean;
  error: SerializedError | null;
}

const userInitialState: IUserInitialState = {
  users: [],
  filters: { name: "", username: "", email: "", phone: "" },
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

export const { setFilters } = userSlice.actions;
export const userReducer = userSlice.reducer;
