import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetCallsController from "../../controllers/rider/getCalls.controller";
import Call from "../../../domain/entities/call";

const getCalls = async (args: any, req: Request): Promise<Call[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const {lat, long} = args.input;
    return GetCallsController.getController().run(id, lat, long);
}

export default getCalls;