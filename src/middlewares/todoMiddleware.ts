import { Middleware, Dispatch } from "redux";
import { ActionType, EActions } from "types";

const todoMiddleware: Middleware = () => (next: Dispatch) => (
  action: ActionType
) => {
  if (action.type === EActions.INIT_TODO) {
    debugger;
  }
  return next(action);
};

export default todoMiddleware;
