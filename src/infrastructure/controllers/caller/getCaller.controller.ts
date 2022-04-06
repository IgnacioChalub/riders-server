import ICallerRepository from "../../../aplication/repositories/caller.repository";
import GetCallerAplicationService from "../../../aplication/aplicationServices/caller/getCaller.aplicationService";
import {Caller} from "../../../domain/entities/caller";
import CallerDAO from "../../persistance/callerDAO";

class GetCallerController{

    private static getCallerController: GetCallerController = GetCallerController.create();

    private getCallerAplicationService: GetCallerAplicationService;

    private constructor(GetCallerAplicationService: GetCallerAplicationService) {
        this.getCallerAplicationService = GetCallerAplicationService;
    }

    static create(): GetCallerController{
        const callerRepository:  ICallerRepository = CallerDAO.getInstance();
        const getCallerAplicationService: GetCallerAplicationService = new GetCallerAplicationService(callerRepository);
        return new GetCallerController(getCallerAplicationService);
    }

    static getController(): GetCallerController{
        return this.getCallerController;
    }

    async run(id: string): Promise<Caller>{
        return await this.getCallerAplicationService.run(id);
    }
}

export default GetCallerController;