import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import RateRiderController from "../../controllers/caller/rateRider.controller";

const rateRider = async (args: any, req: Request): Promise<void> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    const {rideId, stars} = args.input;
    return RateRiderController.getController().run(rideId, id, stars);
}

export default rateRider;