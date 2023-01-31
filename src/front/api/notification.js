import {request} from "./request";

export const NOTIFICATION_add = async (data) => {
  return await request("/notification/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
    .then(data => data);
};
