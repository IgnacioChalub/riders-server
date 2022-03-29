import IPasswordHasher from "../../../domain/infrastructureServices/passwordHasher";
import PasswordHasherImplementation from "../../services/passwordHasherImplementation";
import RegisterRiderAplicationService
    from "../../../aplication/aplicationServices/rider/registerRider.aplicationService";
import Rider from "../../../domain/entities/rider";
import IRiderRepository from "../../../aplication/repositories/rider.repository";
import RiderDAO from "../../persistance/riderDAO";
import CreateRiderDomainService from "../../../domain/services/rider/createRider.service";

class RegisterRiderController{

    private static registerRiderController: RegisterRiderController;

    private registerRiderAplicationService: RegisterRiderAplicationService;

    private constructor(registerRiderAplicationService: RegisterRiderAplicationService) {
        this.registerRiderAplicationService = registerRiderAplicationService;
    }

    static create(): RegisterRiderController{
        const passwordHasher: IPasswordHasher = new PasswordHasherImplementation();
        const riderRepository: IRiderRepository = new RiderDAO();
        const createRiderDomainService: CreateRiderDomainService = new CreateRiderDomainService(passwordHasher);
        const registerRiderAplicationService: RegisterRiderAplicationService = new RegisterRiderAplicationService(riderRepository, createRiderDomainService);
        return new RegisterRiderController(registerRiderAplicationService);
    }

    static getController(): RegisterRiderController{
        if(!this.registerRiderController){
            this.registerRiderController = RegisterRiderController.create();
        }
        return this.registerRiderController;
    }

    async run(name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider>{
        return await this.registerRiderAplicationService.run(name, surname, DNI, email, password, vehicleType);
    }

}

export default RegisterRiderController;