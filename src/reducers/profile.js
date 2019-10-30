export default function(state = [], action) {
  switch (action.type) {
    case "LOAD_PROFILES":
      return state.concat(action.payload);
    default:
      return state;
  }
}
