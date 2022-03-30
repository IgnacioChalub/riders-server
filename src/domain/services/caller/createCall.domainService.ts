import Call from "../../entities/call";
import {Caller} from "../../entities/caller";
import {Location} from "../../entities/location";
import RequestedVehicles from "../../entities/requestedVehicles";

class CreateCallDomainService{

    run(id: string, caller: Caller, requestedVehicles: RequestedVehicles, priceInCents: number, description: string, startLocation: Location, finishLocation: Location): Call{
        if(priceInCents < 0) throw Error("Price can not below 0");
        //if(!this.validateVehicles(vehicleTypes)) throw Error('Invalid vehicle type');
        return new Call(id, caller.getId(), caller.getRatingStart(), requestedVehicles, priceInCents, description, startLocation, finishLocation, true);
    }

    // validateVehicles(vehicleTypes: string[]): boolean{
    //     for (const type of vehicleTypes) {
    //        if(!(Object.values(VehicleTypes).includes(type as VehicleTypes))) return false;
    //     }
    //     return true;
    // }
}

export default CreateCallDomainService;