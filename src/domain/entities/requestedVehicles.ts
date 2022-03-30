import {Column} from "typeorm";

class RequestedVehicles{

    @Column()
    private bicycle: boolean;

    @Column()
    private motorcycle: boolean;

    @Column()
    private car: boolean;

    @Column()
    private van: boolean;

    constructor(bicycle: boolean, motorcycle: boolean, car: boolean, van: boolean) {
        this.bicycle = bicycle;
        this.motorcycle = motorcycle;
        this.car = car;
        this.van = van;
    }

    static create(bicycle: boolean, motorcycle: boolean, car: boolean, van: boolean): RequestedVehicles{
        return new RequestedVehicles(bicycle, motorcycle, car, van);
    }
}

export default RequestedVehicles;