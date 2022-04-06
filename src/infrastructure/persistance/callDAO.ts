import ICallRepository from "../../aplication/repositories/call.repository";
import Call from "../../domain/entities/call";
import call from "../../domain/entities/call";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";
import {AppDataSource} from "../db/database";
import {LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import {Location} from "../../domain/entities/location";
import {VehicleTypes} from "../../domain/entities/vehicle";

class CallDAO implements ICallRepository{

    private static instance: ICallRepository = new CallDAO();

    private repository = AppDataSource.getRepository(Call);
    private locationRepository = AppDataSource.getRepository(Location);
    private tableName = "call";

    static getInstance(): ICallRepository{
        return this.instance;
    }

    async save(call: Call): Promise<void> {
        await this.locationRepository.save(call.getStartLocation()).then();
        await this.locationRepository.save(call.getFinishLocation()).then();
        this.repository.save(call).then()
    }

    async update(call: Call): Promise<void> {
        await this.repository.update(call.getId(),{
            // @ts-ignore
            active: false
        })
    }

    async getById(id: string): Promise<Call> {
        return <Call>await this.repository.findOne({
                relations: ['startLocation', 'finishLocation'],
                where: {
                    // @ts-ignore
                    id: id,
                },
            })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let call;
        let id;
        do {
            id = idGenerator.generateId();
            call = await this.getById(id);
        } while (call)
        return id;
    }

    async generateLocationId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let location;
        let id;
        do {
            id = idGenerator.generateId();
            location = await this.locationRepository.findOne({
                where: {
                    // @ts-ignore
                    id: id,
                },
            });
        } while (location)
        return id;
    }

    async getAllActiveCalls(callerId: string): Promise<Call[]>{
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                callerId: callerId
            }
        });
    }

    async getCallsInSquare(lat: number, long: number, km: number, vehicleType: string): Promise<Call[]> {
        const minLat = lat + (km*0.09);
        const minLong = long + (km*0.09);
        const maxLat = lat - (km*0.09);
        const maxLong = long - (km*0.09);
        let calls: Call[] = [];
        switch (vehicleType){
            case VehicleTypes.BICYCLE:
                calls = await this.getBicycleCalls(minLat, minLong, maxLat, maxLong);
                break;
            case VehicleTypes.MOTORCYCLE:
                calls = await this.getMotorcycleCalls(minLat, minLong, maxLat, maxLong);
                break;
            case VehicleTypes.CAR:
                calls = await this.getCarCalls(minLat, minLong, maxLat, maxLong);
                break;
            case VehicleTypes.VAN:
                calls = await this.getVanCalls(minLat, minLong, maxLat, maxLong);
                break;
        }
        return calls;
    }

    private async getBicycleCalls(minLat: number, minLong: number, maxLat: number, maxLong: number): Promise<Call[]>{
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                requestedVehicles: {
                    bicycle: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: LessThanOrEqual(minLat),
                    long: LessThanOrEqual(minLong)
                }
            },
            orWhere: {
                // @ts-ignore
                requestedVehicles: {
                    bicycle: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: MoreThanOrEqual(maxLat),
                    long: MoreThanOrEqual(maxLong)
                }
            }
        });
    }

    private async getMotorcycleCalls(minLat: number, minLong: number, maxLat: number, maxLong: number): Promise<Call[]>{
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    motorcycle: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: LessThanOrEqual(minLat),
                    long: LessThanOrEqual(minLong)
                }
            },
            orWhere: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    motorcycle: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: MoreThanOrEqual(maxLat),
                    long: MoreThanOrEqual(maxLong)
                }
            }
        });
    }

    private async getCarCalls(minLat: number, minLong: number, maxLat: number, maxLong: number): Promise<Call[]>{
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    car: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: LessThanOrEqual(minLat),
                    long: LessThanOrEqual(minLong)
                }
            },
            orWhere: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    car: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: MoreThanOrEqual(maxLat),
                    long: MoreThanOrEqual(maxLong)
                }
            }
        });
    }

    private async getVanCalls(minLat: number, minLong: number, maxLat: number, maxLong: number): Promise<Call[]>{
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    van: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: LessThanOrEqual(minLat),
                    long: LessThanOrEqual(minLong)
                }
            },
            orWhere: {
                // @ts-ignore
                active: true,
                // @ts-ignore
                requestedVehicles: {
                    van: true,
                },
                // @ts-ignore
                startLocation: {
                    lat: MoreThanOrEqual(maxLat),
                    long: MoreThanOrEqual(maxLong)
                }
            }
        });
    }

}
export default CallDAO;