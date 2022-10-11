import * as Response from "../service/Http/Response.js";
import UserRepository from "../repository/UserRepository.js";

const list = async (req, res) => {
    try {
        // const users = (await UserRepository.findAll(req.user.id)).map(user => {
        //     return {
        //         user: '/user/' + user.id
        //     };
        // });
        const users = await UserRepository.findAll();

        return Response.ok(req, res, users);
    } catch (err) {
        return Response.error(req, res, err.message);
    }
};

const get = async (req, res) => {
    if (req.params === undefined || req.params.id === undefined) {
        return Response.unprocessableEntity(req, res, "Missing parameters");
    }

    try {
        const user = await UserRepository.find(parseInt(req.params.id));

        return Response.ok(req, res, user);
    } catch (err) {
        return Response.notFound(req, res, 'User not found');
    }
};

export {
    list,
    get
};
