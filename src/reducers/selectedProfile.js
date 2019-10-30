export default function(state = {}, action) {
  switch (action.type) {
    case "LOAD_SELECTED_PROFILE":
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
