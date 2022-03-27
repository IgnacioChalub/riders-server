import Rider from "../../entities/rider";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import {Vehicle} from "../../entities/vehicle";
import {Email} from "../../entities/email";
import {Rating} from "../../entities/rating";

class CreateRiderDomainService{

    private passwordHasher: IPasswordHasher;

    constructor(passwordHasher: IPasswordHasher) {
        this.passwordHasher = passwordHasher;
    }

    async createRider(id: string ,name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider>{
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");

        const hashedPassword = this.passwordHasher.hash(password);
        return new Rider(id, name, surname, DNI, Email.create(email), hashedPassword, Vehicle.createVehicle(vehicleType), Rating.create());
    }


}

export default CreateRiderDomainService;