import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllUsers } from "../../services/api";

export const getAllUsersThunk = createAsyncThunk(
  "users/getAllUser",
  async (_, thunkApi) => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
