import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../../domain/entities/rider";

class GetRiderAplicationService{

    private riderRepository: IRiderRepository;

    constructor(riderRepository: IRiderRepository) {
        this.riderRepository = riderRepository;
    }

    async run(id: string): Promise<Rider>{
        return await this.riderRepository.getById(id);
    }
}

export default GetRiderAplicationService;