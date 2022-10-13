import jwt from "jsonwebtoken";

const createToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        roles: user.roles,
    };
    return jwt.sign(payload, process.env.SECRET, {
        expiresIn: "1y",
    });
};

export {createToken};
