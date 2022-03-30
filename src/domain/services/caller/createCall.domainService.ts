import Call from "../../entities/call";
import {Caller} from "../../entities/caller";
import {Location} from "../../entities/location";
import {VehicleTypes} from "../../entities/vehicle";

class CreateCallDomainService{

    run(id: string, caller: Caller, vehicleTypes: string[], priceInCents: number, description: string, startLocation: Location, finishLocation: Location): Call{
        if(priceInCents < 0) throw Error("Price can not below 0");
        if(!this.validateVehicles(vehicleTypes)) throw Error('Invalid vehicle type');
        return new Call(id, caller.getId(), caller.getRatingStart(), vehicleTypes, priceInCents, description, startLocation, finishLocation);
    }

    validateVehicles(vehicleTypes: string[]): boolean{
        for (const type of vehicleTypes) {
           if(!(Object.values(VehicleTypes).includes(type as VehicleTypes))) return false;
        }
        return true;
    }
}

export default CreateCallDomainService;