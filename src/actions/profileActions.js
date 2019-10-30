import {
  FETCH_BASE_URL,
  FETCH_PARAMS,
  FETCH_POST_URL
} from "./fetchParameters";

export const handleGetProfile = () => {
  return async (dispatch, getState) => {
    var response = await fetch(FETCH_BASE_URL, FETCH_PARAMS);
    var json = await response.json();
    return response.ok
      ? dispatch({
          type: "LOAD_PROFILES",
          payload: json
        })
      : dispatch({
          type: "ERROR",
          message: json.message,
          statusCode: ` ${response.status} ${response.statusText}`
        });
  };
};

export const handleSelectedProfile = (user = "user4") => {
  return async (dispatch, getState) => {
    var response = await fetch(FETCH_BASE_URL + user, FETCH_PARAMS);
    var json = await response.json();
    return response.ok
      ? dispatch({
          type: "LOAD_SELECTED_PROFILE",
          payload: json
        })
      : dispatch({
          type: "ERROR",
          message: json.message,
          statusCode: ` ${response.status} ${response.statusText}`
        });
  };
};
export const handleGetLoggedUser = () => {
  return async (dispatch, getState) => {
    const response = await fetch(FETCH_BASE_URL, FETCH_PARAMS);
    const json = await response.json();
    const loggedUser = json.find(current => current.username === "user4");
    return response.ok && loggedUser !== undefined
      ? dispatch({
          type: "LOAD_LOGGED_USER",
          payload: loggedUser
        })
      : dispatch({
          type: "ERROR",
          message: json.message,
          statusCode: ` ${response.status} ${response.statusText}`
        });
  };
};

export const handleGetAllPost = () => {
  return async (dispatch, getState) => {
    var response = await fetch(FETCH_POST_URL, FETCH_PARAMS);
    var json = await response.json();
    var toSend = json.reverse();
    return response.ok
      ? dispatch({
          type: "LOAD_ALL_POST",
          payload: toSend
        })
      : dispatch({
          type: "ERROR",
          message: json.message,
          statusCode: ` ${response.status} ${response.statusText}`
        });
  };
};
