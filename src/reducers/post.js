//INSIDE THE POST LIST PART OF THE REDUX STATE
export default function(state = [], action) {
  switch (action.type) {
    case "ADD_POST":
      return [action.payload, ...state];
    case "LOAD_ALL_POST":
      return [...action.payload, ...state];
    case "DELETE_POST":
      const indexToRemove = state.findIndex(
        current => current._id === action.payload
      );

      return indexToRemove !== -1
        ? [...state.slice(0, indexToRemove), ...state.slice(indexToRemove + 1)]
        : state;
    case "EDIT_POST":
      const indexToEdit = state.findIndex(current => current._id === action.id);
      return indexToEdit !== -1
        ? [
            ...state.slice(0, indexToEdit),
            action.payload,
            ...state.slice(indexToEdit + 1)
          ]
        : state;
    default:
      return state;
  }
}
