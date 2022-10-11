import * as Response from "../service/Http/Response.js";
import UserRepository from "../repository/UserRepository.js";
import bcrypt from 'bcryptjs';

// const login = async (req, res) => {
//     // TODO: Implement login
// };

const register = async (req, res) => {
    if (req.body === undefined || req.body.email === undefined || req.body.password === undefined || req.body.name === undefined || req.body.firstName === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const user = {
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, await bcrypt.genSalt()),
            name: req.body.name,
            firstName: req.body.firstName
        };

        const newUser = await UserRepository.create(user);

        return Response.created(req, res, newUser);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
};

export {
    // login,
    register
};