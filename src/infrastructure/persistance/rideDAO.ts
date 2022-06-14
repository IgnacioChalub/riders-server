import IRideRepository from "../../aplication/repositories/ride.repository";
import {AppDataSource} from "../db/database";
import {Ride} from "../../domain/entities/ride";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";

class RideDAO implements IRideRepository{

    private static instance: IRideRepository = new RideDAO();

    private repository = AppDataSource.getRepository(Ride);
    private tableName = "ride";

    static getInstance(): IRideRepository{
        return this.instance;
    }

    save(ride: Ride): void {
        this.repository.save(ride).then(r => r);
    }

    async getById(id: string): Promise<Ride> {
        return <Ride>await this.repository.findOne({
            relations: ["call", "call.startLocation","call.finishLocation"],
            where: {
                // @ts-ignore
                id: id
            },
        })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let ride;
        let id;
        do {
            id = idGenerator.generateId();
            ride = await this.getById(id);
        } while (ride)
        return id;
    }

    async getRiderActiveRide(riderId: string): Promise<Ride> {
        return <Ride>await this.repository.findOne({
            relations: ["call", "call.startLocation","call.finishLocation"],
            where: {
                // @ts-ignore
                riderId: riderId,
                // @ts-ignore
                active: true
            },
        })
    }

    async updateRiderArrivedFirstLocation(ride: Ride): Promise<void> {
        await this.repository.update(ride.getId(),{
            // @ts-ignore
            riderArrivedStartLocation: true
        })
    }

    async finishRide(ride: Ride): Promise<void> {
        await this.repository.update(ride.getId(),{
            // @ts-ignore
            active: false,
            finishDate: ride.getFinishDate(),
        })
    }

    async updateCallerRated(ride: Ride): Promise<void> {
        await this.repository.update(ride.getId(),{
            // @ts-ignore
            callerRated: true
        })
    }

    async updateRiderRated(ride: Ride, riderRatingStars: number): Promise<void> {
        await this.repository.update(ride.getId(),{
            // @ts-ignore
            riderRated: true,
            riderRatingStars: riderRatingStars
        })
    }

    async getRiderInactiveRides(riderId: string): Promise<Ride[]> {
        return <Ride[]>await this.repository.find({
            relations: ["call", "call.startLocation","call.finishLocation"],
            where: {
                // @ts-ignore
                riderId: riderId,
                // @ts-ignore
                active: false
            },
        })
    }

    async getCallerInactiveRides(callerId: string): Promise<Ride[]> {
        return <Ride[]>await this.repository.find({
            relations: ["call", "call.startLocation","call.finishLocation"],
            where: {
                // @ts-ignore
                call:{
                    callerId: callerId
                },
                // @ts-ignore
                active: false
            },
        })
    }

    async getCallerActiveRides(callerId: string): Promise<Ride[]> {
        return <Ride[]>await this.repository.find({
            relations: ["call", "call.startLocation","call.finishLocation"],
            where: {
                // @ts-ignore
                call:{
                    callerId: callerId
                },
                // @ts-ignore
                active: true
            },
        })
    }

}

export default RideDAO;