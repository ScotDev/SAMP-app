import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import undoable from "easy-redux-undo";
import homeReducer from "../components/home/homeSlice";
import counterReducer from "../components/counter/counterSlice";
import complexReducer from "../components/complex/complexSlice";
import printReducer from "../components/print/printSlice";
import utilsReducer from "../components/utils/utilsSlice";
import notificationsReducer from "../components/notifications/notificationsSlice";

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    home: homeReducer,
    print: printReducer,
    utils: utilsReducer,
    notifications: notificationsReducer,
    undoable: undoable(
      combineReducers({
        counter: counterReducer,
        complex: complexReducer
      })
    )
  });

export default rootReducer;
