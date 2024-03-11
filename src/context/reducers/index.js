import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import projectReducer from "./projectReducer";
import searchReducer from "./searchReducer";
import updateProjectReducer from "./updateProjectReducer";

const myReducer = combineReducers({
  user: userAuthReducer,
  projects: projectReducer,
  searchTerm: searchReducer,
  updateProject: updateProjectReducer,
});

export default myReducer;
