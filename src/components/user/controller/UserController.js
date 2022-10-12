import * as Response from "../../../common/service/Http/Response.js";
import UserRepository from "../repository/UserRepository.js";
import Controller from "../../../common/controller/Controller.js";

class UserController extends Controller {
    list = async (req, res) => {
        try {
            const users = await UserRepository.findAll();

            return Response.ok(req, res, users);
        } catch (err) {
            return Response.error(req, res, err.message);
        }
    };

    get = async (req, res) => {
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
}

export default new UserController();
