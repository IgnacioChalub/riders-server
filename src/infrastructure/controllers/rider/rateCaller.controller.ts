import RateCallerAplicationService from "../../../aplication/aplicationServices/rider/rateCaller.aplicationService";
import RideDAO from "../../persistance/rideDAO";
import CallerDAO from "../../persistance/callerDAO";
import RateCallerDomainService from "../../../domain/services/rider/rateCaller.domainService";

class RateCallerController{

    private static rateCallerController: RateCallerController;

    private rateCallerAplicationService: RateCallerAplicationService;

    constructor(rateCallerAplicationService: RateCallerAplicationService) {
        this.rateCallerAplicationService = rateCallerAplicationService;
    }

    static create(): RateCallerController{
        const rateCallerDomainService: RateCallerDomainService = new RateCallerDomainService();
        const rateCallerAplicationService: RateCallerAplicationService = new RateCallerAplicationService(RideDAO.getInstance(), CallerDAO.getInstance(), rateCallerDomainService);
        return new RateCallerController(rateCallerAplicationService);
    }

    static getController(): RateCallerController{
        if(!this.rateCallerController) this.rateCallerController = RateCallerController.create();
        return this.rateCallerController;
    }

    async run(rideId: string, riderId: string, stars: number): Promise<void>{
        return await this.rateCallerAplicationService.run(rideId, riderId, stars);
    }
}

export default RateCallerController;