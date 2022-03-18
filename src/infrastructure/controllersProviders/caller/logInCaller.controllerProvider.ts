import LogInCallerController from "../../../aplication/controllers/caller/logInCaller.controller";
import LogInCallerService from "../../../domain/services/caller/logInCaller.service";
import ICallerRepository from "../../../domain/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import ILogger from "../../../domain/infrastructureServices/logger";
import JWTLogger from "../../services/logger";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImpl";

class RegisterCallerControllerProvider{

    private static logInCallerController: LogInCallerController;

    static create(): LogInCallerController{
        const callerRepository: ICallerRepository = new CallerDAO();
        const logger: ILogger = new JWTLogger();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const logInCallerService: LogInCallerService = new LogInCallerService(logger, passwordHasher, callerRepository);
        return new LogInCallerController(logInCallerService);
    }

    static getController(): LogInCallerController{
        if(!this.logInCallerController){
            this.logInCallerController = RegisterCallerControllerProvider.create();
        }
        return this.logInCallerController;
    }
}

export default RegisterCallerControllerProvider;