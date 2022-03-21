import Rider from "../../entities/rider";
import IPasswordHasher from "../../infrastructureServices/passwordHasher";
import IIdGenerator from "../../infrastructureServices/idGenerator";
import IRiderRepository from "../../repositories/rider.repository";
import {Vehicle} from "../../entities/vehicle";

class RegisterRiderService{

    private riderRepository: IRiderRepository;
    private passwordHasher: IPasswordHasher;
    private idGenerator: IIdGenerator;

    constructor(riderRepository: IRiderRepository, passwordHasher: IPasswordHasher, idGenerator: IIdGenerator) {
        this.riderRepository = riderRepository;
        this.passwordHasher = passwordHasher;
        this.idGenerator = idGenerator;
    }

    async register(name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider>{
        if (password.length < 7) throw Error("Password should contain more than 7 characters");
        if (DNI < 0) throw Error("DNI not valid");
        if(!this.validEmail(email)) throw Error("Email format not valid");

        const rider: Rider = await this.riderRepository.getByDNIorEmail(DNI, email);
        if (rider) throw Error("DNI or email not available");

        const vehicle: Vehicle = Vehicle.createVehicle(vehicleType);

        const hashedPassword = this.passwordHasher.hash(password);
        const id: string = await this.generateValidId();
        const newRider: Rider = new Rider(id, name, surname, DNI, email, hashedPassword, vehicle);
        this.riderRepository.save(newRider);
        return newRider;
    }

    private async generateValidId(): Promise<string> {
        let caller;
        let id;
        do {
            id = this.idGenerator.generateId();
            caller = await this.riderRepository.getById(id);
        } while (caller)
        return id;
    }

    private validEmail = (email: string): boolean => {
        if (
            /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
                email,
            )
        ) {
            return true;
        }
        if (email.trim() === '') {
            return false;
        }
        return false;
    };
}

export default RegisterRiderService;