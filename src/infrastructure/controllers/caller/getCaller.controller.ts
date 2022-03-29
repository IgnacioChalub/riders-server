import ICallerRepository from "../../../aplication/repositories/caller.repository";
import GetCallerAplicationService from "../../../aplication/aplicationServices/caller/getCaller.aplicationService";
import {Caller} from "../../../domain/entities/caller";
import CallerDAO from "../../persistance/callerDAO";

class GetCallerController{

    private static getCallerController: GetCallerController;

    private getCallerAplicationService: GetCallerAplicationService;

    private constructor(GetCallerAplicationService: GetCallerAplicationService) {
        this.getCallerAplicationService = GetCallerAplicationService;
    }

    static create(): GetCallerController{
        const callerRepository:  ICallerRepository = new CallerDAO();
        const getCallerAplicationService: GetCallerAplicationService = new GetCallerAplicationService(callerRepository);
        return new GetCallerController(getCallerAplicationService);
    }

    static getController(): GetCallerController{
        if(!this.getCallerController){
            this.getCallerController = GetCallerController.create();
        }
        return this.getCallerController;
    }

    async run(id: string): Promise<Caller>{
        return await this.getCallerAplicationService.run(id);
    }
}

export default GetCallerController;