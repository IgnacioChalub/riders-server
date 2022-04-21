"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rider_1 = __importDefault(require("../../../../../src/domain/entities/rider"));
const vehicle_1 = require("../../../../../src/domain/entities/vehicle");
const email_1 = require("../../../../../src/domain/entities/email");
const rating_1 = require("../../../../../src/domain/entities/rating");
class RiderDAOMock {
    generateId() {
        return Promise.resolve("");
    }
    getByDNIorEmail(DNI, emailAddress) {
        // @ts-ignore
        return Promise.resolve(undefined);
    }
    getByEmail(email) {
        // @ts-ignore
        return Promise.resolve(undefined);
    }
    getById(id) {
        const rider = new rider_1.default("1", "ignacio", "chalub", 43627494, email_1.Email.create("ignaciochalub@gmail.com"), "password", vehicle_1.Vehicle.createVehicle("car"), rating_1.Rating.create());
        return Promise.resolve(rider);
    }
    save(rider) {
    }
}
exports.default = RiderDAOMock;
