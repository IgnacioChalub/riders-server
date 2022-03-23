import IRiderRepository from "../../repositories/rider.repository";
import Rider from "../../entities/rider";

class GetRiderService {

    private riderRepository: IRiderRepository;


    constructor(riderRepository: IRiderRepository) {
        this.riderRepository = riderRepository;
    }

    async getRider(id: string): Promise<Rider>{
        return await this.riderRepository.getById(id);
    }
}

export default GetRiderService;