import {Ride} from "../../domain/entities/ride";

interface IRideRepository {
    save(ride: Ride): void;
    generateId(): Promise<string>;
    getById(id: string): Promise<Ride>;
    getRiderActiveRide(riderId: string): Promise<Ride>;
    updateRiderArrivedFirstLocation(ride: Ride): void;
    finishRide(ride: Ride): void;
    updateCallerRated(ride: Ride): Promise<void>;
    updateRiderRated(ride: Ride, riderRatingStars: number): Promise<void>;
    getRiderInactiveRides(riderId: string): Promise<Ride[]>;
    getCallerInactiveRides(callerId: string): Promise<Ride[]>
}

export default IRideRepository;