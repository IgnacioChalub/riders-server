import {Request} from "express";
import {Ride} from "../../../domain/entities/ride";
import {tokenValidation} from "../shared/tokenValidation";
import UpdateRiderArrivedFirstLocationController
    from "../../controllers/rider/updateRiderArrivedFirstLocation.controller";

const updateRiderArrivedFirstLocation = async (args: any, req: Request): Promise<Ride> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    return UpdateRiderArrivedFirstLocationController.getController().run(id);
}

export default updateRiderArrivedFirstLocation;