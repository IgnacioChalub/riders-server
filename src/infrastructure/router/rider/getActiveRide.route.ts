import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetActiveRideController from "../../controllers/rider/getActiveRide.controller";
import {Ride} from "../../../domain/entities/ride";

const getActiveRide= async (args:any, req:Request): Promise<Ride> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    return GetActiveRideController.getController().run(id);
}
export default getActiveRide;