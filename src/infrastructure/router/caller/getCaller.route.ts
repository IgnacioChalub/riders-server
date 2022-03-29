import {Request} from "express";
import {tokenValidation} from "../shared/tokenValidation";
import {Caller} from "../../../domain/entities/caller";
import GetCallerController from "../../controllers/caller/getCaller.controller";

const getCaller = async (args: any, req: Request): Promise<Caller> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    return GetCallerController.getController().run(id);
}

export default getCaller;