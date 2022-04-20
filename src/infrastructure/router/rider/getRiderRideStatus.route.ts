import {Request} from "express";
import Rider from "../../../domain/entities/rider";
import {tokenValidation} from "../shared/tokenValidation";
import GetRiderController from "../../controllers/rider/getRider.controller";
import GetRiderRideStatusController from "../../controllers/rider/getRiderRideStatus.controller";

const getRiderRideStatus = async (args: any, req: Request): Promise<any> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    const status = await GetRiderRideStatusController.getController().run(id);
    return {
        inRide: status
    }
}

export default getRiderRideStatus;