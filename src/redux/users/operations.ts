import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllUsers } from "../../services/api";
import { handleApiError } from "../../services/handleApiError";
// import { RootState } from "../stote";

export const getAllUsersThunk = createAsyncThunk(
  "users/getAllUser",
  async (_, thunkApi) => {
    try {
      const response = await getAllUsers();
      return response;
    } catch (error) {
      const errorObj = handleApiError(error);
      return thunkApi.rejectWithValue(errorObj);
    }
  }
);
