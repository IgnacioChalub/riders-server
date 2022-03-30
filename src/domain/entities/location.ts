import {Column} from "typeorm";

class Location{

    @Column()
    private address: string;

    @Column()
    private lat: number;

    @Column()
    private long: number;

    constructor(address: string, lat: number, long: number) {
        this.address = address;
        this.lat = lat;
        this.long = long;
    }

    static create(address: string, lat: number, long: number): Location{
        return new Location(address, lat, long);
    }
}

export {Location};