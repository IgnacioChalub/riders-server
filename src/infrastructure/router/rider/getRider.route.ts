import GetRiderControllerProvider from "../../controllersProviders/rider/getRider.controllerProvider";
import Rider from "../../../domain/entities/rider";
import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";

const getRider = async (args: any, req: Request): Promise<Rider> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "rider");
    return GetRiderControllerProvider.getController().getRider(id);
}

export default getRider;