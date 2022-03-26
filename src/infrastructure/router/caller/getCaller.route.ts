import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import GetCallerControllerProvider from "../../controllersProviders/caller/getCaller.controllerProvider";
import {Caller} from "../../../domain/entities/caller";

const getCaller = async (args: any, req: Request): Promise<Caller> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    return GetCallerControllerProvider.getController().getCaller(id);
}

export default getCaller;