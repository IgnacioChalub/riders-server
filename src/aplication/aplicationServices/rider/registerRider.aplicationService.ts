import IRiderRepository from "../../repositories/rider.repository";
import CreateRiderDomainService from "../../../domain/services/rider/createRider.service";
import Rider from "../../../domain/entities/rider";

class RegisterRiderAplicationService{

    private riderRepository: IRiderRepository;
    private createRiderDomainService: CreateRiderDomainService;


    constructor(riderRepository: IRiderRepository, createRiderDomainService: CreateRiderDomainService) {
        this.riderRepository = riderRepository;
        this.createRiderDomainService = createRiderDomainService;
    }

    async registerRider(name: string, surname: string, DNI: number, email: string, password: string, vehicleType: string): Promise<Rider> {
        const rider: Rider = await this.riderRepository.getByDNIorEmail(DNI, email);
        if (rider) throw Error("DNI or email not available");

        const id: string = await this.riderRepository.generateId();
        const newRider: Rider = await this.createRiderDomainService.createRider(id, name, surname, DNI, email, password, vehicleType);
        this.riderRepository.save(newRider);
        return newRider;
    }
}

export default RegisterRiderAplicationService;