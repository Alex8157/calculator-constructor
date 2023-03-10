const defaultState = {
  buffer: "",
};

export const bufferReduser = (state = defaultState, action) => {
  switch (action.type) {
    case "CHANGE_BUFFER":
      return { ...state, buffer: action.payload };
    default:
      return state;
  }
};
