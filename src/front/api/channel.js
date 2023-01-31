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

    const response = await deleted.json();

    if (!deleted.ok) {
      throw new Error(response.messages);
    }

    return deleted;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CHANNEL_update = async ({id, name, limit}) => {
  return await request("/channel/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      limit,
    })
  })
    .then(data => data);
};
