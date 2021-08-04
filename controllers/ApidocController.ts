import * as express from "express";
import { 
    interfaces, 
    controller, 
    httpGet
} from "inversify-express-utils";
import { injectable, inject } from "inversify";

import { ResponseService } from "../services/ResponseService";
import { readFileSync } from "fs";

@controller("/docs")
export class ApidocController implements interfaces.Controller {
    constructor(
        @inject("ResponseService") private responseService : ResponseService
    ) {
        console.log("Starting /docs endpoint...");
    }

    @httpGet("/index")
    private showDoc(req: express.Request, res: express.Response, next: express.NextFunction) {
        console.log("Rendering an HTML file...");
        res.header("content-type", "text/html");

        const path = require("path");
        const htmldoc = readFileSync(path.join(__dirname, "../docs/index.html"), "utf-8");
        
        return htmldoc;
    }
}