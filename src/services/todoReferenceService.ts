import client from "./client";
import { IPromiseSuccess } from "types";

const API_TODO_URL = "/api/todo";

export const postTodoReference = (
  id: number,
  data: { todoReferenceId: number }
): Promise<IPromiseSuccess> =>
  client.post(`${API_TODO_URL}/${id}/reference`, data);
