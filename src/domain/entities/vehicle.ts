import {Column} from "typeorm";

class Vehicle{

    @Column()
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    static createVehicle(vehicleType: string): Vehicle{
        switch (vehicleType){
            case "bicycle": return new Vehicle(vehicleType);
            case "motorcycle": return new Vehicle(vehicleType);
            case "car": return new Vehicle(vehicleType);
            case "van": return new Vehicle(vehicleType);
            default: throw Error("Invalid vehicle type");
        }
    }

    getType(): string{
        return this.type;
    }
}

export {Vehicle};
