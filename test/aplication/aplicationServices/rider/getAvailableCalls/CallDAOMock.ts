import ICallRepository from "../../../../../src/aplication/repositories/call.repository";
import Call from "../../../../../src/domain/entities/call";
import RequestedVehicles from "../../../../../src/domain/entities/requestedVehicles";
import {Location} from "../../../../../src/domain/entities/location";

class CallDAOMock implements ICallRepository{
    generateId(): Promise<string> {
        return Promise.resolve("");
    }

    generateLocationId(): Promise<string> {
        return Promise.resolve("");
    }

    getAllActiveCalls(callerId: string): Promise<Call[]> {
        return Promise.resolve([]);
    }

    getById(id: string): Promise<Call> {
        // @ts-ignore
        return Promise.resolve(undefined);
    }

    getCallsInSquare(lat: number, long: number, km: number, vehicleType: string): Promise<Call[]> {
        const calls: Call[] = [];

        const startLocation1: Location = Location.create("0", "address", -34.4068654,-58.6578094)
        const finishLocation1: Location = Location.create("00", "address", 10,10)
        calls.push(new Call(
            "0", "0", 5, new RequestedVehicles(true, true,true, true), 10000, "package", startLocation1, finishLocation1, new Date(), true
        ))

        const startLocation2: Location = Location.create("1", "address", -34.4131326,-58.6438508)
        const finishLocation2: Location = Location.create("11", "address", 10, 10)
        calls.push(new Call(
            "1", "1", 5, new RequestedVehicles(true, true,true, true), 10000, "package", startLocation2, finishLocation2, new Date(), true
        ))

        const startLocation3: Location = Location.create("2", "address", -34.441822, -58.579475)
        const finishLocation3: Location = Location.create("22", "address", 10, 10)
        calls.push(new Call(
            "2", "2", 5, new RequestedVehicles(true, true,true, true), 10000, "package", startLocation3, finishLocation3, new Date(), true
        ))

        const startLocation4: Location = Location.create("3", "address",-34.449111, -58.571548)
        const finishLocation4: Location = Location.create("33", "address", 10, 10)
        calls.push(new Call(
            "3", "3", 5, new RequestedVehicles(true, true,true, true), 10000, "package", startLocation4, finishLocation4, new Date(), true
        ))


        // >10
        const startLocation5: Location = Location.create("4", "address", -34.321244, -58.663669)
        const finishLocation5: Location = Location.create("44", "address", 10, 10)
        calls.push(new Call(
            "4", "4", 5, new RequestedVehicles(true, true,true, true), 10000, "package", startLocation5, finishLocation5, new Date(), true
        ))

        return Promise.resolve(calls);
    }

    save(call: Call): void {
    }

    setInactive(call: Call): void {
    }

}

export default CallDAOMock;