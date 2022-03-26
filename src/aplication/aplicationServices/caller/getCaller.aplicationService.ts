import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";

class GetCallerAplicationService{
    private callerRepository: ICallerRepository;


    constructor(callerRepository: ICallerRepository) {
        this.callerRepository = callerRepository;
    }

    async getCaller(id: string): Promise<Caller>{
        return await this.callerRepository.getById(id);
    }
}

export default GetCallerAplicationService;