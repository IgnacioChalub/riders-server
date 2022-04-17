import IRiderRepository from "../../../../../src/aplication/repositories/rider.repository";
import Rider from "../../../../../src/domain/entities/rider";
import {Vehicle} from "../../../../../src/domain/entities/vehicle";
import {Email} from "../../../../../src/domain/entities/email";
import {Rating} from "../../../../../src/domain/entities/rating";

class RiderDAOMock implements IRiderRepository{
    generateId(): Promise<string> {
        return Promise.resolve("");
    }

    getByDNIorEmail(DNI: number, emailAddress: string): Promise<Rider> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }

    getByEmail(email: string): Promise<Rider> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }

    getById(id: string): Promise<Rider> {
        const rider: Rider = new Rider("1", "ignacio", "chalub", 43627494, Email.create("ignaciochalub@gmail.com"), "password", Vehicle.createVehicle("car"), Rating.create());
        return Promise.resolve(rider);
    }

    save(rider: Rider): void {
    }

}

export default RiderDAOMock;
