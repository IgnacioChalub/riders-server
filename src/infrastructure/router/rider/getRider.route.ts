import GetRiderControllerProvider from "../../controllersProviders/rider/getRider.controllerProvider";
import Rider from "../../../domain/entities/rider";
import {Request} from "express";
import {riderTokenValidation} from "./verifyRiderToken";

const getRider = async (args: any, req: Request): Promise<Rider> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = riderTokenValidation(token);
    return GetRiderControllerProvider.getController().getRider(id);
}

export default getRider;