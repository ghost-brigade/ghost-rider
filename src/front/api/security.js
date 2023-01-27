import {request} from "./request";

export const SECURITY_login = async (data) => {
    return request('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }, false)
    .then(response => {
        return response;
    });
};

export const SECURITY_register = async (data) => {
    try {
      return await request('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }, false);
    } catch (err) {
      throw new Error("Erreur lors de l'inscription, veuillez réessayer plus tard");
    }
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
