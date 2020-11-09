import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";

export default combineReducers({
  user: userReducer,
});

// import { combinedReducers } from "redux";
// import userReducer from "./user/user.reducer";

// export default combinedReducers({
//   user: userReducer
// });
