import {request} from "./request";

export const CHANNEL_get = async () => {
  return await request("/channel", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(data => data);
};

export const CHANNEL_find = async (id) => {
  return await request(`/channel/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(data => data);
};

export const CHANNEL_conseiller = async (id) => {
  return await request(`/channel/conseiller/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(data => data);
};

export const CHANNEL_post = async (data) => {
  return await request("/channel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(data => data);
};

export const CHANNEL_delete = async (id) => {
  try {
    const deleted = await request("/channel/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }, false);

    if (!deleted.ok) {
      throw new Error("Error while deleting channel");
    }

    return;
  } catch (error) {
    throw new Error('Error while deleting channel');
  }
};
