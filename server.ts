import "reflect-metadata"
import * as bodyParser from 'body-parser';
import * as express from "express";
import * as swagger from "swagger-express-ts";

import { Container } from 'inversify';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';
import { decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { SwaggerDefinitionConstant } from "swagger-express-ts";

// Declare controllers
import "./controllers/EchoController";
import "./controllers/ApidocController"

// Import services for binding
import { EchoService } from './services/EchoService';
import { ResponseService } from './services/ResponseService';

// Import models for binding
// import { ReplyModel } from "./models/reply";

// Create container
let container = new Container();
container.load(buildProviderModule());
container.bind<EchoService>("EchoService").to(EchoService);
container.bind<ResponseService>("ResponseService").to(ResponseService);

// Create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    // app.use(express.static(__dirname + "docs"));
    app.use("/api-docs/swagger" , express.static("swagger"));
    app.use("/api-docs/swagger/assets" , express.static("node_modules/swagger-ui-dist"));
    app.use(swagger.express({
        definition : {
            info: {
                title : "Swagger API Doc Template" ,
                version : "1.0"
            },
            securityDefinitions : {
                basicAuth : {
                    type : SwaggerDefinitionConstant.Security.Type.BASIC_AUTHENTICATION,
                    in: SwaggerDefinitionConstant.Security.In.HEADER,
                    name: "Authorization"
                },
                apiKeyHeader : {
                    type: SwaggerDefinitionConstant.Security.Type.API_KEY,
                    in: SwaggerDefinitionConstant.Security.In.HEADER,
                    name: "x-api-key"
                }
            }
        }
    }));
});

let app = server.build();
app.listen(3000);
console.log("Server listening at 0.0.0.0:3000");
