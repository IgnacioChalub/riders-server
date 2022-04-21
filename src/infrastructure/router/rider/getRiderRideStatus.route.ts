import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
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