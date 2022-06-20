import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
class Location{

    @PrimaryColumn()
    private id: string;

    @Column()
    private address: string;

    @Column({type:"decimal"})
    private readonly lat: number;

    @Column({type:"decimal"})
    private readonly long: number;

    constructor(id: string, address: string, lat: number, long: number) {
        this.id = id;
        this.address = address;
        this.lat = lat;
        this.long = long;
    }

    static create(id: string, address: string, lat: number, long: number): Location{
        return new Location(id, address, lat, long);
    }

    isInRadius(lat: number, long: number, km: number): boolean{
        // const latDist = this.toKm(lat - this.lat);
        // const longDist: number =  this.toKm(long - this.long);
        // const dist: number = Math.sqrt((latDist) ** 2 + (longDist) ** 2);
        // return dist <= km;
        function toRad(x: number) {
            return x * Math.PI / 180;
        }

        const dLat = toRad((lat) - (this.lat));
        const dLon = toRad((long) - (this.long));

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(this.lat)) *
            Math.cos(toRad(lat)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const distance: number = 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return distance <= km;
    }

    getAddress(): string{
        return this.address;
    }
}

export {Location};