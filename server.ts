import "reflect-metadata"
import * as bodyParser from 'body-parser';
import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { decorate, injectable } from "inversify";

// Declare controllers
import "./controllers/EchoController";

// Import services for binding
import { EchoService } from './services/EchoService';
import { ResponseService } from './services/ResponseService';

decorate(injectable(), EchoService);
decorate(injectable(), ResponseService);

// Create container
let container = new Container();
container.bind<EchoService>("EchoService").to(EchoService);
container.bind<ResponseService>("ResponseService").to(ResponseService);

// Create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000);
console.log("Server listening at 0.0.0.0:3000")
