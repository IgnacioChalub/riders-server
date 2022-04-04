import ICallerRepository from "../../repositories/caller.repository";
import {Caller} from "../../../domain/entities/caller";
import CreateCallerDomainService from "../../../domain/services/caller/createCaller.domainService";


class RegisterCallerAplicationService{

    private callerRepository: ICallerRepository;
    private createCallerDomainService: CreateCallerDomainService;


    constructor(callerRepository: ICallerRepository, createCallerDomainService: CreateCallerDomainService) {
        this.callerRepository = callerRepository;
        this.createCallerDomainService = createCallerDomainService;
    }

    async run(name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller>{
        const caller: Caller = await this.callerRepository.getByDNIorEmail(DNI, email);
        if (caller) throw Error("DNI or email not available");

        const id: string = await this.callerRepository.generateId();
        const newCaller: Caller = await this.createCallerDomainService.run(id, name, surname, DNI, email, password);
        this.callerRepository.save(newCaller);
        return newCaller;
    }
}

export default RegisterCallerAplicationService;

