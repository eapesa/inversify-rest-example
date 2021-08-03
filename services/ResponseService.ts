import { reply } from "../models/reply";

export class ResponseService {
    constructor() {}
    
    private format(code: number, output?: object): reply {
        let CODE_MATRIX = {
            200: "OK",
            201: "CREATED",
            400: "BAD_REQUEST",
            401: "UNAUTHORIZED",
            403: "FORBIDDEN",
            404: "NOT_FOUND",
            405: "INVALID_METHOD",
            500: "SERVER_ERROR"
        };
        let mainBody = {
            "code": code,
            "message": CODE_MATRIX[code] || "UNIDENTIFIED_ERROR"
        };
        if (output) {
            mainBody["result"] = output
        }
        return mainBody;
    }

    public async constructReply(code: number, output?: object) {
        return this.format(code, output);
    }
}