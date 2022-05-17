import {Request} from "express";
import {Ride} from "../../../domain/entities/ride";
import {tokenValidation} from "../shared/tokenValidation";
import GetRiderRecordController from "../../controllers/rider/getRiderRecord.controller";

const getRiderRecord = async (args: any, req: Request): Promise<Ride[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    return GetRiderRecordController.getController().run(id);
}

export default getRiderRecord;