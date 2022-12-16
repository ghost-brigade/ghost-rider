import Controller from "../../../common/controller/controller.js";
import * as Response from "../../../common/service/Http/Response.js";
import fs from "fs";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

class ChatbotController extends Controller {

  chatbot = async (req, res) => {

    const treePath = path.join(dirname(fileURLToPath(import.meta.url), '..', '/tree.json'));

    const tree = await fs.readFileSync(treePath);
    console.log(tree);

    return Response.ok(req, res, "tree");
    //return Response.ok(res, "Hello");
  };
}

export default new ChatbotController;
