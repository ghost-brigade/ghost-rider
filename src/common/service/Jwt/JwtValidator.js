import jwt from "jsonwebtoken";

const checkToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.SECRET);
        return {
            id: decoded.id,
            email: decoded.email,
            name: decoded.firstname,
            firstname: decoded.lastname,
            roles: decoded.roles,
        };
    } catch (error) {
        return false;
    }
};

export default checkToken;