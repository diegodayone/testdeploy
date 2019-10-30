export default function(state = [], action) {
  switch (action.type) {
    case "LOAD_EXPERIENCE":
      return action.payload;

    default:
      return state;
  }
}
