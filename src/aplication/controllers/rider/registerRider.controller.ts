import Rider from "../../../domain/entities/rider";
import RegisterRiderService from "../../../domain/services/rider/registerRider.service";

class RegisterRiderController{

    private registerRiderService: RegisterRiderService;


    constructor(registerRiderService: RegisterRiderService) {
        this.registerRiderService = registerRiderService;
    }

    async registerRider(name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider>{
        return await this.registerRiderService.register(name, surname, DNI, email, password, vehicleType);
    }
}

export default RegisterRiderController;