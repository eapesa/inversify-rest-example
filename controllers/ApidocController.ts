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

import { ResponseService } from "../services/ResponseService";

@controller("/doc")
export class ApidocController implements interfaces.Controller {
    constructor(
        @inject("ResponseService") private responseService : ResponseService
    ) {}

    @httpGet("/")
    private showDoc(req: express.Request, res: express.Response, next: express.NextFunction) {
        const path = require("path");
        console.log("Rendering an HTML file...");
        res.sendFile(path.join(__dirname + "../docs/index.html"));
    }
}