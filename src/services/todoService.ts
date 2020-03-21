import client from "./client";
import { ITodo } from "types";

const API_TODO_URL = "/api/todo";

export const getTodo = (): Promise<ITodo[]> => client.get(API_TODO_URL);
