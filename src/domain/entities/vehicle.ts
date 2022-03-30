import {Column} from "typeorm";

export enum VehicleTypes{
    BICYCLE= "bicycle",
    MOTORCYCLE= "motorcycle",
    CAR= "car",
    VAN= "van"
}

class Vehicle{

    @Column()
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    static createVehicle(vehicleType: string): Vehicle{
        switch (vehicleType){
            case VehicleTypes.BICYCLE: return new Vehicle(VehicleTypes.BICYCLE);
            case VehicleTypes.MOTORCYCLE: return new Vehicle(VehicleTypes.MOTORCYCLE);
            case VehicleTypes.CAR: return new Vehicle(VehicleTypes.CAR);
            case VehicleTypes.VAN: return new Vehicle(VehicleTypes.VAN);
            default: throw Error("Invalid vehicle type");
        }
    }

    getType(): string{
        return this.type;
    }
}

export {Vehicle};
