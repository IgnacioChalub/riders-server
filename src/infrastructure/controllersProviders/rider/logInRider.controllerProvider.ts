import IRiderRepository from "../../../domain/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImpl";
import ILogger from "../../../domain/infrastructureServices/logger";
import JWTLogger from "../../services/logger";
import LogInRiderController from "../../../aplication/controllers/rider/logInRider.controller";
import LogInRiderService from "../../../domain/services/rider/logInRider.service";

class LogInRiderControllerProvider{

    private static logInRiderController: LogInRiderController;

    static create(): LogInRiderController{
        const riderRepository: IRiderRepository = new RiderDAO();
        const logger: ILogger = new JWTLogger();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const logInRiderService: LogInRiderService = new LogInRiderService(logger, passwordHasher, riderRepository);
        return new LogInRiderController(logInRiderService);
    }

    static getController(): LogInRiderController{
        if(!this.logInRiderController){
            this.logInRiderController = LogInRiderControllerProvider.create();
        }
        return this.logInRiderController;
    }
}

export default LogInRiderControllerProvider;