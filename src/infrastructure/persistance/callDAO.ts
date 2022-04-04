import ICallRepository from "../../aplication/repositories/call.repository";
import Call from "../../domain/entities/call";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";
import {AppDataSource} from "../db/database";
import {LessThanOrEqual, MoreThanOrEqual} from "typeorm";
import {Location} from "../../domain/entities/location";

class CallDAO implements ICallRepository{

    private repository = AppDataSource.getRepository(Call);
    private locationRepository = AppDataSource.getRepository(Location);
    private tableName = "call";

    async save(call: Call): Promise<void> {
        await this.locationRepository.save(call.getStartLocation()).then();
        await this.locationRepository.save(call.getFinishLocation()).then();
        this.repository.save(call).then()
    }

    async getById(id: string): Promise<Call> {
        return <Call>await this.repository.findOne({
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

    async getCallsInSquare(lat: number, long: number, km: number): Promise<Call[]> {
        const lat1 = lat + (km*0.09);
        const long1 = long + (km*0.09);
        const lat2 = lat - (km*0.09);
        const long2 = long - (km*0.09);
        return <Call[]><unknown>await this.repository.find({
            relations:['startLocation', 'finishLocation'],
            where: {
                // @ts-ignore
                startLocation: {
                    lat: LessThanOrEqual(lat1),
                    long: LessThanOrEqual(long1)
                }
            },
            orWhere: {
                // @ts-ignore
                startLocation: {
                    lat: MoreThanOrEqual(lat2),
                    long: MoreThanOrEqual(long2)
                }
            }
        })
    }


}
export default CallDAO;