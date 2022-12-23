import {request} from "./request";

export const USER_find = async (path) => {
    return await request(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(data => data);
};