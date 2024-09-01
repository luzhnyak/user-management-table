import axios from "axios";
import { IUser } from "../types";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

export const getAllUsers = async (): Promise<IUser[]> => {
  const { data } = await axios.get(`/users`);
  return data;
};
