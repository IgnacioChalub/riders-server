import {Request} from "express";
import {Ride} from "../../../domain/entities/ride";
import {tokenValidation} from "../shared/tokenValidation";
import FinishRideController from "../../controllers/rider/finishRide.controller";

const finishRide = async (args: any, req: Request): Promise<Ride> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const {callerDNI} = args.input;
    return await FinishRideController.getController().run(id, callerDNI);
}

export default finishRide;