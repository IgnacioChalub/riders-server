import RegisterRiderController from "../../../aplication/controllers/rider/registerRider.controller";
import IRiderRepository from "../../../domain/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import IIdGenerator from "../../../domain/infrastructureServices/idGenerator";
import IdGeneratorImplementation from "../../services/idGeneratorImpl";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImpl";
import RegisterRiderService from "../../../domain/services/rider/registerRider.service";

class RegisterRiderControllerProvider{

    private static registerRiderController: RegisterRiderController;

    static create(): RegisterRiderController{
        const riderRepository: IRiderRepository = new RiderDAO();
        const idGenerator: IIdGenerator = new IdGeneratorImplementation();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();

        const registerRiderService: RegisterRiderService = new RegisterRiderService(riderRepository, passwordHasher, idGenerator);
        return new RegisterRiderController(registerRiderService);
    }

    static getController(): RegisterRiderController{
        if(!this.registerRiderController){
            this.registerRiderController = RegisterRiderControllerProvider.create();
        }
        return this.registerRiderController;
    }
}

export default RegisterRiderControllerProvider;