import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import CancelCallController from "../../controllers/caller/cancelCall.controller";

const cancelCall = async (args: any, req: Request): Promise<void> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    const {callId} = args.input;
    await CancelCallController.getController().run(id, callId);
}

export default cancelCall;