const defaultState = {
  string: "",
  input: "",
  lastSymbol: " ",
};

const checkOperators = (symbol) => {
  return "+-/*".indexOf(symbol) === -1 ? false : true;
};

export const countingStateReduser = (state = defaultState, action) => {
  switch (action.type) {
    case "ADD_IN_STRING":
      if (state.lastSymbol === "=") {
        if (checkOperators(action.payload)) {
          return {
            ...state,
            string: `${state.input}${action.payload}`,
            lastSymbol: action.payload,
          };
        }
        return {
          ...state,
          string: action.payload,
          input: action.payload,
          lastSymbol: action.payload,
        };
      }
      if (checkOperators(state.lastSymbol)) {
        return {
          ...state,
          string: `${state.string}${action.payload}`,
          input: action.payload,
          lastSymbol: action.payload,
        };
      }
      if (checkOperators(action.payload)) {
        return {
          ...state,
          string: `${state.string}${action.payload}`,
          lastSymbol: action.payload,
        };
      }
      return {
        ...state,
        string: `${state.string}${action.payload}`,
        input: `${state.input}${action.payload}`,
        lastSymbol: action.payload,
      };
    case "CLEAN_STRING":
      let newString = state.string.replaceAll(/,/g, ".");
      let number = eval(newString.replace(/[^+-/*.\d]/g, ""));
      number = isFinite(number)
        ? `${Math.round(number * 1000000000) / 1000000000}`
        : "Не определено";
      return {
        ...state,
        string: "",
        input: number,
        lastSymbol: "=",
      };
    case "CLEAN_ALL":
      return {
        ...state,
        string: "",
        result: "",
        input: "",
        lastSymbol: " ",
      };
    default:
      return state;
  }
};
