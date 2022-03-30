import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import Call from "../../../domain/entities/call";
import CreateCallController from "../../controllers/caller/createCall.controller";

const createCall = async (args: any, req: Request, {input}: any): Promise<Call> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    const { vehicleTypes, priceInCents, description, startAddress, finishAddress, startLat, startLong, finishLat, finishLong} = input;
    return CreateCallController.getController().run(id, vehicleTypes, priceInCents, description, startAddress, finishAddress, startLat, startLong, finishLat, finishLong);
}

export default createCall;