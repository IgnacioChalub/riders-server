import GetCallerService from "../../../domain/services/caller/getCaller.service";
import {Caller} from "../../../domain/entities/caller";

class GetCallerController{

    private readonly getCallerService: GetCallerService;

    constructor(getCallerService: GetCallerService) {
        this.getCallerService = getCallerService;
    }

    async getCaller(id: string): Promise<Caller> {
        return await this.getCallerService.getCaller(id);
    }
}


export default GetCallerController;