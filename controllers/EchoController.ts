import * as express from "express";
import { 
    interfaces, 
    controller, 
    httpGet, 
    httpPost, 
    httpDelete, 
    request, 
    queryParam, 
    response, 
    requestParam 
} from "inversify-express-utils";
import { injectable, inject } from "inversify";

import { EchoService } from "../services/EchoService"
import { ResponseService } from "../services/ResponseService";

@controller("/echo")
export class EchoController implements interfaces.Controller {
    constructor(
        @inject("EchoService") private echoService : EchoService,
        @inject("ResponseService") private responseService : ResponseService
    ) {}

    @httpGet("/:name")
    private getName(req: express.Request, res: express.Response, next: express.NextFunction): object {
        let name = req.params.name;
        if (!name) {
            return this.responseService.constructReply(400);
        }
        if (name.length > 10) {
            return this.responseService.constructReply(403);
        }
        let output = this.echoService.greetName(req.params.name);
        if (!output) {
            return this.responseService.constructReply(500);
        }
        return this.responseService.constructReply(200, output)
    }
}