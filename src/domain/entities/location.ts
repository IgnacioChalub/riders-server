class Location{

    private address: string;
    private lat: number;
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