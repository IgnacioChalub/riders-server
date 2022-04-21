"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const call_1 = __importDefault(require("../../../../../src/domain/entities/call"));
const requestedVehicles_1 = __importDefault(require("../../../../../src/domain/entities/requestedVehicles"));
const location_1 = require("../../../../../src/domain/entities/location");
class CallDAOMock {
    generateId() {
        return Promise.resolve("");
    }
    generateLocationId() {
        return Promise.resolve("");
    }
    getAllActiveCalls(callerId) {
        return Promise.resolve([]);
    }
    getById(id) {
        // @ts-ignore
        return Promise.resolve(undefined);
    }
    getCallsInSquare(lat, long, km, vehicleType) {
        const calls = [];
        const startLocation1 = location_1.Location.create("0", "address", -34.4068654, -58.6578094);
        const finishLocation1 = location_1.Location.create("00", "address", 10, 10);
        calls.push(new call_1.default("0", "0", 5, new requestedVehicles_1.default(true, true, true, true), 10000, "package", startLocation1, finishLocation1, new Date(), true));
        const startLocation2 = location_1.Location.create("1", "address", -34.4131326, -58.6438508);
        const finishLocation2 = location_1.Location.create("11", "address", 10, 10);
        calls.push(new call_1.default("1", "1", 5, new requestedVehicles_1.default(true, true, true, true), 10000, "package", startLocation2, finishLocation2, new Date(), true));
        const startLocation3 = location_1.Location.create("2", "address", -34.441822, -58.579475);
        const finishLocation3 = location_1.Location.create("22", "address", 10, 10);
        calls.push(new call_1.default("2", "2", 5, new requestedVehicles_1.default(true, true, true, true), 10000, "package", startLocation3, finishLocation3, new Date(), true));
        const startLocation4 = location_1.Location.create("3", "address", -34.449111, -58.571548);
        const finishLocation4 = location_1.Location.create("33", "address", 10, 10);
        calls.push(new call_1.default("3", "3", 5, new requestedVehicles_1.default(true, true, true, true), 10000, "package", startLocation4, finishLocation4, new Date(), true));
        // >10
        const startLocation5 = location_1.Location.create("4", "address", -34.321244, -58.663669);
        const finishLocation5 = location_1.Location.create("44", "address", 10, 10);
        calls.push(new call_1.default("4", "4", 5, new requestedVehicles_1.default(true, true, true, true), 10000, "package", startLocation5, finishLocation5, new Date(), true));
        return Promise.resolve(calls);
    }
    save(call) {
    }
    setInactive(call) {
    }
}
exports.default = CallDAOMock;
