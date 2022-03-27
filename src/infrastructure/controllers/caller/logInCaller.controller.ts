import ICallerRepository from "../../../aplication/repositories/caller.repository";
import CallerDAO from "../../persistance/callerDAO";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import LogInCallerAplicationService from "../../../aplication/aplicationServices/caller/logInCaller.aplicationService";
import ILogger from "../../../aplication/infrastructureServices/logger";
import JWTLogger from "../../services/logger";

class LogInCallerController{

    private static logInCallerController: LogInCallerController;

    private logInCallerAplicationService: LogInCallerAplicationService;

    private constructor(logInCallerAplicationService: LogInCallerAplicationService) {
        this.logInCallerAplicationService = logInCallerAplicationService;
    }

    static create(): LogInCallerController{
        const callerRepository: ICallerRepository = new CallerDAO();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const logger: ILogger = new JWTLogger();
        const logInCallerAplicationService: LogInCallerAplicationService = new LogInCallerAplicationService(logger, passwordHasher, callerRepository);
        return new LogInCallerController(logInCallerAplicationService);
    }

    static getController(): LogInCallerController{
        if(!this.logInCallerController){
            this.logInCallerController = LogInCallerController.create();
        }
        return this.logInCallerController;
    }

    async logIn(email: string, password: string): Promise<string>{
        return await this.logInCallerAplicationService.logIn(email, password);
    }

}

export default LogInCallerController;