import {Column} from "typeorm";

class Vehicle{

    @Column()
    private readonly type: string;

    constructor(type: string) {
        this.type = type;
    }

    static createVehicle(vehicleType: string): Vehicle{
        switch (vehicleType){
            case "bicycle": return new Vehicle("bicycle");
            case "motorcycle": return new Vehicle("motorcycle");
            case "car": return new Vehicle("car");
            case "van": return new Vehicle("van");
            default: throw Error("Invalid vehicle type");
        }
    }

    getType(): string{
        return this.type;
    }
}

export {Vehicle};
