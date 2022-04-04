import {Request} from "express";
import Call from "../../../domain/entities/call";
import {tokenValidation} from "../shared/tokenValidation";
import CreateCallController from "../../controllers/caller/createCall.controller";
import GetActiveCallsController from "../../controllers/caller/getActiveCalls.controller";

const getActiveCalls = async (args: any, req: Request): Promise<Call[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    return await GetActiveCallsController.getController().run(id);
}

export default getActiveCalls;