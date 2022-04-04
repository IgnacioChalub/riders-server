import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetAvailableCallsController from "../../controllers/rider/getAvailableCalls.controller";
import Call from "../../../domain/entities/call";

const getAvailableCalls = async (args: any, req: Request): Promise<Call[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const {lat, long} = args.input;
    return GetAvailableCallsController.getController().run(id, lat, long);
}

export default getAvailableCalls;