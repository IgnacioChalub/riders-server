"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAvailableCalls_aplicationService_1 = __importDefault(require("../../../../../src/aplication/aplicationServices/rider/getAvailableCalls.aplicationService"));
const CallDAOMock_1 = __importDefault(require("./CallDAOMock"));
const RiderDAOMock_1 = __importDefault(require("./RiderDAOMock"));
const callRepository = new CallDAOMock_1.default();
const riderRepository = new RiderDAOMock_1.default();
const getAvailableCallsAplicationService = new getAvailableCalls_aplicationService_1.default(callRepository, riderRepository);
/**
 * The call id is its index in the list.
 */
test('test get all available calls', () => __awaiter(void 0, void 0, void 0, function* () {
    const rider = yield riderRepository.getById("");
    const calls = yield getAvailableCallsAplicationService.run(rider.getId(), -34.411244, -58.663669);
    expect(calls.length).toBe(4);
    for (let i = 0; i < calls.length; i++) {
        expect(calls[i].getId()).toBe(i.toString());
    }
}));
