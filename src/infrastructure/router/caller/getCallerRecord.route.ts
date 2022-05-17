import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetCallerRecordController from "../../controllers/caller/getCallerRecord.controller";
import {Ride} from "../../../domain/entities/ride";

const getCallerRecord = async (args: any, req: Request): Promise<Ride[]> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    return GetCallerRecordController.getController().run(id);
}

export default getCallerRecord;