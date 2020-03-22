export interface IPromiseSuccess<T> {
  message?: string;
  data: T;
}

export interface IPage {
  number: number;
  size: number;
  total?: number;
}

export interface ITodo {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  referenceTodoId: number[];
  isDone: number;
  isDeleted: number;
}
