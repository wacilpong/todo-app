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
  keyword?: string;
  sort?: "newest" | "oldest";
}

export interface ITodo {
  id: number;
  createdAt: string;
  updatedAt: string;
  contents: string;
  todoReferences: { todoReferenceId: number }[];
  isDone: boolean;
  isDeleted: boolean;
}

export interface ITodoParams {
  contents?: string;
  isDone?: number;
}
