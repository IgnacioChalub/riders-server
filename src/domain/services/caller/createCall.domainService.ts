import Call from "../../entities/call";
import {Caller} from "../../entities/caller";
import {Location} from "../../entities/location";
import RequestedVehicles from "../../entities/requestedVehicles";

class CreateCallDomainService{

    run(id: string, caller: Caller, requestedVehicles: RequestedVehicles, priceInCents: number, description: string, startLocation: Location, finishLocation: Location, date: Date): Call{
        if(priceInCents < 0) throw Error("Price can not be under 0");
        return new Call(id, caller.getId(), caller.getRatingStart(), requestedVehicles, priceInCents, description, startLocation, finishLocation, date, true);
    }
}

export default CreateCallDomainService;