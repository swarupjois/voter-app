export const globalStateReducer = (state, action) => {
  switch (action.type) {
    case "setData":
      return { ...state, data: action.payload };
    default:
      break;
  }
};
