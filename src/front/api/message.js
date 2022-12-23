import {request} from "./request";

export const MESSAGE_add = async (data) => {
    return await request("/message", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(data => data);
};

export const MESSAGE_list = async (channelId) => {
    return await request(`/message/${channelId}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        }
    })
    .then(data => data);
};