import client from "./client";
import { IPromiseSuccess, ITodo, ITodoQueryJson, ITodoParams } from "types";

const API_TODO_URL = "/api/todo";

export const getTodo = (
  params: ITodoQueryJson
): Promise<IPromiseSuccess<ITodo[], { totalCount: number }>> =>
  client.get(API_TODO_URL, { params });

export const postTodo = (data: ITodoParams): Promise<IPromiseSuccess> =>
  client.post(API_TODO_URL, data);

export const patchTodo = (
  id: number,
  data: ITodoParams
): Promise<IPromiseSuccess> => client.patch(`${API_TODO_URL}/${id}`, data);

export const deleteTodo = (id: number): Promise<IPromiseSuccess> =>
  client.delete(`${API_TODO_URL}/${id}`);

export const getThisTodo = (id: number): Promise<IPromiseSuccess<ITodo>> =>
  client.get(`${API_TODO_URL}/${id}`);
