import {request} from "./request";

export const SECURITY_login = async (data) => {
    return request('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(data => {
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    });
};

export const SECURITY_current = async () => {
    return await request('/current', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then(data => data);
};