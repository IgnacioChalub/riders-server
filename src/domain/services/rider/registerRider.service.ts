import Rider from "../../entities/rider";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import IRiderRepository from "../../repositories/rider.repository";
import {Vehicle} from "../../entities/vehicle";
import {Email} from "../../entities/email";
import {Rating} from "../../entities/rating";

class RegisterRiderService{

    private riderRepository: IRiderRepository;
    private passwordHasher: IPasswordHasher;

    constructor(riderRepository: IRiderRepository, passwordHasher: IPasswordHasher) {
        this.riderRepository = riderRepository;
        this.passwordHasher = passwordHasher;
    }

    async register(name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider>{
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");

        const rider: Rider = await this.riderRepository.getByDNIorEmail(DNI, email);
        if (rider) throw Error("DNI or email not available");

        const vehicle: Vehicle = Vehicle.createVehicle(vehicleType);

        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = await this.riderRepository.generateId();
        const newRider: Rider = new Rider(id, name, surname, DNI, Email.create(email), hashedPassword, vehicle, Rating.create());

        this.riderRepository.save(newRider);
        return newRider;
    }


}

export default RegisterRiderService;