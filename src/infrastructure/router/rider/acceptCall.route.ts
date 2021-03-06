import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import AcceptCallController from "../../controllers/rider/acceptCall.controller";
import {Ride} from "../../../domain/entities/ride";

const acceptCall = async (args: any, req: Request): Promise<Ride> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const {callId} = args.input;
    return await AcceptCallController.getController().run(callId, id);
}

export default acceptCall;