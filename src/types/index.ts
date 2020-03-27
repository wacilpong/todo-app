export interface IPromiseSuccess<T = any, M = any> {
  data: T;
  meta: M;
  message?: string;
}

export interface IPage {
  page: number;
  size?: number;
  totalCount?: number;
}

export interface ITodoQueryJson {
  page?: number;
  size?: number;
  deleted?: number;
  done?: number;
  query?: string;
  sort?: "newest" | "oldest";
}

export interface ITodo {
  id: number;
  createdAt: string;
  updatedAt: string;
  contents: string;
  referenceTodoId: number[];
  isDone: number;
  isDeleted: number;
}

export interface ITodoParams {
  contents?: string;
  isDone?: number;
}
