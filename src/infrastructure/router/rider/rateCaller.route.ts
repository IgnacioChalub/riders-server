import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import RateCallerController from "../../controllers/rider/rateCaller.controller";
import rider from "../../../domain/entities/rider";

const rateCaller = async (args: any, req: Request): Promise<void> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const {rideId, stars} = args.input;
    return RateCallerController.getController().run(rideId, id, stars);
}

export default rateCaller;