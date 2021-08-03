import { Request } from "restify";
import { Controller, Get, interfaces } from "inversify-restify-utils";
import { injectable, inject  } from "inversify";
import { EchoService } from "../services/EchoService"
import "reflect-metadata";

@Controller("/echo/:name")
@injectable()
export class EchoController implements interfaces.Controller {
    constructor(
        @inject("EchoService") private echoService : EchoService
    ) {}

    @Get("/")
    private index(req: Request): object {
        return this.echoService.echoName(req.params.name);
    }
}