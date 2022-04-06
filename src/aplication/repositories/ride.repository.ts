import {Ride} from "../../domain/entities/ride";

interface IRideRepository {
    save(ride: Ride): void;
    generateId(): Promise<string>;
    getById(id: string): Promise<Ride>;
    getRiderActiveRide(riderId: string): Promise<Ride>;
}

export default IRideRepository;