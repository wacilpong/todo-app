import client from "./client";
import { IPromiseSuccess } from "types";

const API_TODO_URL = "/api/todo";

export const postTodoReference = (
  id: number,
  data: { todoReferenceId: number }
): Promise<IPromiseSuccess> =>
  client.post(`${API_TODO_URL}/${id}/reference`, data);

export const deleteTodoRefernece = (
  id: number,
  todoReferenceId: number
): Promise<IPromiseSuccess> =>
  client.delete(`${API_TODO_URL}/${id}/reference/${todoReferenceId}`);
