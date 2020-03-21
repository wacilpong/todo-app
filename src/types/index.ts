export type ActionType<T = any> = { type: string; payload: T };

export enum EActions {
  INIT_TODO = "INIT_TODO"
}

export interface IStore {
  todo: {
    currentList: ITodo[];
  };
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
  isDone: boolean;
}
