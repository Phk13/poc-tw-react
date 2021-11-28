import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function getProfileApi(id) {
  const url = `${API_HOST}/viewProfile?id=${id}`;

  const params = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  return fetch(url, params)
    .then((response) => {
      // eslint-disable-next-line no-throw-literal
      if (response.status >= 400) throw null;
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
