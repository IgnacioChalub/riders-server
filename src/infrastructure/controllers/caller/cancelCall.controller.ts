import CancelCallAplicationService from "../../../aplication/aplicationServices/caller/cancelCall.aplicationService";
import CallDAO from "../../persistance/callDAO";
import CallerDAO from "../../persistance/callerDAO";

class CancelCallController{

    private static cancelCallController: CancelCallController;

    private cancelCallAplicationService: CancelCallAplicationService;

    constructor(cancelCallAplicationService: CancelCallAplicationService) {
        this.cancelCallAplicationService = cancelCallAplicationService;
    }

    static create(): CancelCallController{
        const cancelCallAplicationService: CancelCallAplicationService = new CancelCallAplicationService(CallDAO.getInstance(), CallerDAO.getInstance());
        return new CancelCallController(cancelCallAplicationService);
    }

    static getController(): CancelCallController{
        if(!this.cancelCallController) this.cancelCallController = CancelCallController.create();
        return this.cancelCallController;
    }

    async run(callerId: string, callId: string): Promise<void>{
        await this.cancelCallAplicationService.run(callerId, callId);
    }

}

export default CancelCallController;