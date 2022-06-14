import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import { Ride } from "../../../domain/entities/ride";
import GetCallerActiveRidesController from "../../controllers/caller/getCallerActiveRides.controller";

const getCallerActiveRides = async (args: any, req: Request): Promise<Ride[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    return GetCallerActiveRidesController.getController().run(id);
}

export default getCallerActiveRides;