import RegisterRiderController from "../../../aplication/controllers/rider/registerRider.controller";
import IRiderRepository from "../../../domain/repositories/rider.repository";
import IdGeneratorImplementation from "../../services/idGeneratorImplementation";
import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import RegisterRiderService from "../../../domain/services/rider/registerRider.service";
import RiderDAO from "../../persistance/riderDAO";

class RegisterRiderControllerProvider{

    private static registerRiderController: RegisterRiderController;

    static create(): RegisterRiderController{
        const riderRepository: IRiderRepository = new RiderDAO();
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();

        const registerRiderService: RegisterRiderService = new RegisterRiderService(riderRepository, passwordHasher);
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