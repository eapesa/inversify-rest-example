import path = require("path/posix");
import * as express from "express";
import { 
    interfaces, 
    controller, 
    httpGet
} from "inversify-express-utils";
import { inject } from "inversify";
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant } from "swagger-express-ts";

import { EchoService } from "../services/EchoService"
import { ResponseService } from "../services/ResponseService";

// TODO: Troubleshoot this and have this declarations and decorations in the model file itself
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
    description: "Reply to HTTP requests model",
    name: "Reply"
})
export class ReplyModel {
    @ApiModelProperty({
        description: "Response code",
        required: true
    })
    code: number;

    @ApiModelProperty({
        description: "Response short message",
        required: true
    })
    message: string;

    @ApiModelProperty({
        description: "Response additional output usually returned for GET requests",
    })
    result?: object | string;
}

@ApiPath({
    path: "/echo/:name",
    name: "Echo Name"
})
@controller("/echo")
export class EchoController implements interfaces.Controller {
    constructor(
        @inject("EchoService") private echoService : EchoService,
        @inject("ResponseService") private responseService : ResponseService
    ) {}

    @ApiOperationGet({
        description: "Echo name in the params",
        summary: "Echo :name provided in the URL",
        parameters: {
            path: {
                name: {
                    required: true,
                    type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                    name: "name"
                }
            }
        },
        responses: {
            200: { 
                description: "OK", 
                model: "Reply"
            }
        }
    })
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