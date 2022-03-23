import GetRiderService from "../../../domain/services/rider/getRider.service";
import Rider from "../../../domain/entities/rider";

class GetRiderController{

    private readonly getRiderService: GetRiderService;


    constructor(getRiderService: GetRiderService) {
        this.getRiderService = getRiderService;
    }

    async getRider(id: string): Promise<Rider> {
        return await this.getRiderService.getRider(id);
    }
}

export default GetRiderController;