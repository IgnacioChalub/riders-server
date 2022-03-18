import RegisterCallerController from "./registerCaller.controller";
import RegisterCallerService from "../../../../domain/services/registerCaller.service";
import ICallerRepository from "../../../../domain/repositories/caller.repository";
import CallerDAO from "../../../../infrastructure/persistance/callerDAO";
import IIdGenerator from "../../../../domain/infrastructureServices/idGenerator";
import IdGeneratorImplementation from "../../../../infrastructure/services/idGeneratorImpl";
import IPasswordHasher from "../../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../../../infrastructure/services/passwordHasherImpl";

class RegisterCallerControllerProvider{

    private static registerCallerController: RegisterCallerController;

    static create(): RegisterCallerController{
        const callerRepository: ICallerRepository = new CallerDAO();
        const idGenerator: IIdGenerator = new IdGeneratorImplementation();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();

        const registerCallerService: RegisterCallerService = new RegisterCallerService(callerRepository, passwordHasher, idGenerator);
        return new RegisterCallerController(registerCallerService);
    }

    static getController(): RegisterCallerController{
        if(!this.registerCallerController){
            this.registerCallerController = RegisterCallerControllerProvider.create();
        }
        return this.registerCallerController;
    }
}

export default RegisterCallerControllerProvider;