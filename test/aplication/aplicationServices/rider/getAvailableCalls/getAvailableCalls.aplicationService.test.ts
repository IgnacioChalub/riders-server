import GetAvailableCallsAplicationService
    from "../../../../../src/aplication/aplicationServices/rider/getAvailableCalls.aplicationService";
import IRiderRepository from "../../../../../src/aplication/repositories/rider.repository";
import ICallRepository from "../../../../../src/aplication/repositories/call.repository";
import CallDAOMock from "./CallDAOMock";
import RiderDAOMock from "./RiderDAOMock";
import Call from "../../../../../src/domain/entities/call";
import Rider from "../../../../../src/domain/entities/rider";


const callRepository: ICallRepository = new CallDAOMock();
const riderRepository: IRiderRepository = new RiderDAOMock();
const getAvailableCallsAplicationService: GetAvailableCallsAplicationService = new GetAvailableCallsAplicationService(callRepository, riderRepository);

/**
 * The call id is its index in the list.
 */
test('test get all available calls', async() => {
    const rider: Rider = await riderRepository.getById("");
    const calls: Call[] = await getAvailableCallsAplicationService.run(rider.getId(), -34.411244, -58.663669);
    expect(calls.length).toBe(4)
    for (let i = 0; i < calls.length; i++) {
        expect(calls[i].getId()).toBe(i.toString());
    }
});
