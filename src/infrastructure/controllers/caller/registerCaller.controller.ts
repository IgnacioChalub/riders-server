import CreateCallerDomainService from "../../../domain/services/caller/createCaller.domainService";
import ICallerRepository from "../../../aplication/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import RegisterCallerAplicationService
    from "../../../aplication/aplicationServices/caller/registerCaller.aplicationService";
import {Caller} from "../../../domain/entities/caller";

class RegisterCallerController{

    private static registerCallerController: RegisterCallerController;

    private registerCallerAplicationService: RegisterCallerAplicationService;

    private constructor(registerCallerAplicationService: RegisterCallerAplicationService) {
        this.registerCallerAplicationService = registerCallerAplicationService;
    }

    static create(): RegisterCallerController{
        const callerRepository: ICallerRepository = new CallerDAO();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();

        const createCallerDomainService: CreateCallerDomainService = new CreateCallerDomainService(passwordHasher);
        const registerCallerAplicationService: RegisterCallerAplicationService = new RegisterCallerAplicationService(callerRepository, createCallerDomainService);
        return new RegisterCallerController(registerCallerAplicationService);
    }

    static getController(): RegisterCallerController{
        if(!this.registerCallerController){
            this.registerCallerController = RegisterCallerController.create();
        }
        return this.registerCallerController;
    }

    async run(name: string, surname: string, DNI: number, email: string, password: string): Promise<Caller>{
        return await this.registerCallerAplicationService.run(name, surname, DNI, email, password);
    }

}

export default RegisterCallerController;