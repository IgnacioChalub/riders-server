import Rider from "../../../domain/entities/rider";
import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetRiderController from "../../controllers/rider/getRider.controller";

const getRider = async (args: any, req: Request): Promise<Rider> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    return GetRiderController.getController().getRider(id);
}

export default getRider;