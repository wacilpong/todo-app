export interface IPromiseSuccess<T, M = any> {
  message?: string;
  meta: M;
  data: T;
}

export interface IPage {
  page: number;
  size?: number;
  totalCount?: number;
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
