import client from "./client";
import { IPromiseSuccess, ITodo, IPage, ITodoParams } from "types";

const API_TODO_URL = "/api/todo";

export const getTodo = (
  params: IPage
): Promise<IPromiseSuccess<ITodo[], { totalCount: number }>> =>
  client.get(API_TODO_URL, { params });

export const postTodo = (data: ITodoParams): Promise<IPromiseSuccess> =>
  client.post(API_TODO_URL, data);
