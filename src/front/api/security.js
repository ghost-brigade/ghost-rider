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

export const SECURITY_account_confirmation = async (data) => {
  try {
    return await request('/register/confirm/' + data?.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, false);
  } catch (err) {
    throw new Error("Erreur lors de la validation de votre compte");
  }
};

export const SECURITY_forgot_password = async (data) => {
  try {
    return await request('/reset-password/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, false);
  } catch (err) {
    throw new Error("Erreur lors de la ré-initialisation de votre mot de passe");
  }
};

export const SECURITY_reset_password = async (data) => {
  try {
    return await request('/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }, false);
  } catch (err) {
    throw new Error("Erreur lors de la modification de votre mot de passe");
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
