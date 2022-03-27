import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import LogInRiderAplicationService from "../../../aplication/aplicationServices/rider/logInRider.aplicationService";
import ILogger from "../../../aplication/infrastructureServices/logger";
import JWTLogger from "../../services/logger";

class LogInRiderController{

    private static logInRiderController: LogInRiderController;

    private logInRiderAplicationService: LogInRiderAplicationService;

    private constructor(logInRiderAplicationService: LogInRiderAplicationService) {
        this.logInRiderAplicationService = logInRiderAplicationService;
    }

    static create(): LogInRiderController{
        const riderRepository: IRiderRepository = new RiderDAO();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const logger: ILogger = new JWTLogger();
        const logInRiderAplicationService: LogInRiderAplicationService = new LogInRiderAplicationService(logger, passwordHasher, riderRepository);
        return new LogInRiderController(logInRiderAplicationService);
    }

    static getController(): LogInRiderController{
        if(!this.logInRiderController){
            this.logInRiderController = LogInRiderController.create();
        }
        return this.logInRiderController;
    }

    async logIn(email: string, password: string): Promise<string>{
        return await this.logInRiderAplicationService.logIn(email, password);
    }

}

export default LogInRiderController;