export default function(state = null, action) {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        fetchError: true,
        message: action.message,
        statusCode: action.statusCode
      };
    default:
      return state;
  }
}
