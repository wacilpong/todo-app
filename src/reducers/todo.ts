import { ActionType, EActions, IPage } from "types";

export const initTodo = (payload: IPage) => ({
  type: EActions.INIT_TODO,
  payload
});

// TODO: 서버에서 DB 연결 후 API로부터 받아올 것
const initialState = {
  currentList: [
    {
      id: 1,
      createdAt: "UTC date",
      updatedAt: "",
      content: "해야 할 일",
      referenceTodoId: [],
      isDone: true
    },
    {
      id: 2,
      createdAt: "UTC date",
      updatedAt: "UTC date",
      content: "해야 할 일",
      referenceTodoId: [],
      isDone: false
    },
    {
      id: 3,
      createdAt: "UTC date",
      updatedAt: "UTC date",
      content: "해야 할 일",
      referenceTodoId: [1, 2],
      isDone: false
    }
  ]
};
export default (state = initialState, action: ActionType) => {
  switch (action.type) {
    case EActions.INIT_TODO:
      return state;
    default:
      return state;
  }
};
