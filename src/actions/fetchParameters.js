import { encode } from "base-64";
const username = "user4";
const password = process.env.REACT_APP_API_PASS;

export const headers = new Headers({
  "Content-Type": "application/json",
  Authorization: "Basic " + encode(username + ":" + password),
  credentials: "same-origin"
});

export const FETCH_PARAMS = {
  method: "GET",
  headers: headers
};

export const POST_PARAMS = {
  method: "POST",
  headers: headers
};

export const DELETE_PARAMS = {
  method: "DELETE",
  headers: headers
};
export const PUT_PARAMS = {
  method: "PUT",
  headers: headers
};

export const FETCH_BASE_URL =
  "https://striveschool.herokuapp.com/api/profiles/";

export const FETCH_POST_URL = "https://striveschool.herokuapp.com/api/posts/";
