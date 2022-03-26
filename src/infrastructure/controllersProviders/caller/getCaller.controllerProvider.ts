import LogInCallerController from "../../../aplication/controllers/caller/logInCaller.controller";
import GetCallerController from "../../../aplication/controllers/caller/getCaller.controller";
import ICallerRepository from "../../../domain/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import GetCallerService from "../../../domain/services/caller/getCaller.service";


class GetCallerControllerProvider{

    private static getCallerController: GetCallerController;

    static create(): GetCallerController{
        const callerRepository: ICallerRepository = new CallerDAO();
        const getCallerService: GetCallerService = new GetCallerService(callerRepository);
        return new GetCallerController(getCallerService);
    }

    static getController(): GetCallerController{
        if(!this.getCallerController){
            this.getCallerController = GetCallerControllerProvider.create();
        }
        return this.getCallerController;
    }
}

export default GetCallerControllerProvider;