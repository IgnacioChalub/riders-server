import RideDAO from "../../persistance/rideDAO";
import RateRiderAplicationService from "../../../aplication/aplicationServices/caller/rateRider.aplicationService";
import RiderDAO from "../../persistance/riderDAO";
import RateRiderDomainService from "../../../domain/services/caller/rateRider.domainService";

class RateRiderController{

    private static rateRiderController: RateRiderController;

    private rateRiderAplicationService: RateRiderAplicationService;

    constructor(rateRiderAplicationService: RateRiderAplicationService) {
        this.rateRiderAplicationService = rateRiderAplicationService;
    }

    static create(): RateRiderController{
        const rateRiderDomainService: RateRiderDomainService = new RateRiderDomainService();
        const rateRiderAplicationService: RateRiderAplicationService = new RateRiderAplicationService(RideDAO.getInstance(), RiderDAO.getInstance(), rateRiderDomainService);
        return new RateRiderController(rateRiderAplicationService);
    }

    static getController(): RateRiderController{
        if(!this.rateRiderController) this.rateRiderController = RateRiderController.create();
        return this.rateRiderController;
    }

    async run(rideId: string, callerId: string, stars: number): Promise<void>{
        return await this.rateRiderAplicationService.run(rideId, callerId, stars);
    }
}

export default RateRiderController;