import { legacy_createStore as createStore, combineReducers } from "redux";
import { optionReduser } from "./optionReduser";
import { bufferReduser } from "./bufferReduser";
import { canvasReduser } from "./canvasReduser";
import { countingStateReduser } from "./countingStateReduser";

const reduser = combineReducers({
  option: optionReduser,
  buffer: bufferReduser,
  canvas: canvasReduser,
  countingState: countingStateReduser,
});

export const store = createStore(reduser);
