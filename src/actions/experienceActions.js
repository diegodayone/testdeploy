import { FETCH_BASE_URL, FETCH_PARAMS } from "./fetchParameters";

export const handleSelectedExperience = (user = "user4") => {
  return async (dispatch, getState) => {
    var response = await fetch(
      `${FETCH_BASE_URL}/${user}/experiences`,
      FETCH_PARAMS
    );
    var json = await response.json();
    return response.ok
      ? dispatch({
          type: "LOAD_EXPERIENCE",
          payload: json
        })
      : dispatch({
          type: "ERROR",
          message: json.message,
          statusCode: ` ${response.status} ${response.statusText}`
        });
  };
};
