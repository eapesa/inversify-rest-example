import { Container } from "inversify";
import { interfaces, InversifyRestifyServer, TYPE } from "inversify-restify-utils";
// import { InversifyExpressServer } from 'inversify-express-utils';
import { EchoController } from "./controllers/EchoController";
import { EchoService } from "./services/EchoService"

import { decorate, injectable } from "inversify";
import "reflect-metadata";

let container = new Container();

decorate(injectable(), EchoService);

container.bind<interfaces.Controller>(TYPE.Controller).to(EchoController).whenTargetNamed("EchoController");
container.bind<EchoService>("EchoService").to(EchoService);

let server = new InversifyRestifyServer(container);
let app = server.build();
app.listen(3000);
console.log("Server listening at 0.0.0.0:3000")