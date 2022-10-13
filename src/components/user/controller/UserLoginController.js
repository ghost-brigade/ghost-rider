import * as Response from "../../../common/service/Http/Response.js";
import Controller from "../../../common/controller/Controller.js";

class UserControllerLogin extends Controller {
    login = async (req, res) => {
        if (req.body === undefined || req.body.email === undefined || req.body.password === undefined) {
            return Response.unprocessableEntity(req, res, "Missing parameters");
        }

        try {
            const Authentificator = await import("../../../common/service/Security/Authentificator.js");
            let jwtToken = await Authentificator.authentification(req.body.email, req.body.password);

            return Response.ok(req, res, {'token': jwtToken});
        } catch (err) {
            return Response.unauthorized(req, res, err.message);
        }
    };
}

export default new UserControllerLogin();
