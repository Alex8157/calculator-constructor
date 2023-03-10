const defaultState = {
  option: "Constructor",
};

export const optionReduser = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_OPTION":
      return { ...state, option: action.payload };
    default:
      return state;
  }
};
