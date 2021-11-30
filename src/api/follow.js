import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
  const url = `${API_HOST}/checkRelationship?id=${idUser}`;

  const params = {
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function followUserApi(idUser) {
  const url = `${API_HOST}/createRelationship?id=${idUser}`;

  const params = {
    method: "POST",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function unFollowUserApi(idUser) {
  const url = `${API_HOST}/deleteRelationship?id=${idUser}`;

  const params = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer${getTokenApi()}`,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
