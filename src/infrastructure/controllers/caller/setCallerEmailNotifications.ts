import SetCallerEmailNotificationsAplicationService from "../../../aplication/aplicationServices/caller/setCallerEmailNotifications.aplicationService";
import CallerDAO from "../../persistance/callerDAO";

class SetCallerEmailNotificationsController{

    private static setCallerEmailNotificationsController: SetCallerEmailNotificationsController;
    
    private setCallerEmailNotificationsAplicationService: SetCallerEmailNotificationsAplicationService; 

    constructor(setCallerEmailNotificationsAplicationService: SetCallerEmailNotificationsAplicationService){
        this.setCallerEmailNotificationsAplicationService = setCallerEmailNotificationsAplicationService;
    }

    static create(): SetCallerEmailNotificationsController{
        const setCallerEmailNotificationsAplicationService: SetCallerEmailNotificationsAplicationService = new SetCallerEmailNotificationsAplicationService(CallerDAO.getInstance());
        return new SetCallerEmailNotificationsController(setCallerEmailNotificationsAplicationService);    
    }

    static getController(): SetCallerEmailNotificationsController{
        if(!this.setCallerEmailNotificationsController) this.setCallerEmailNotificationsController = SetCallerEmailNotificationsController.create();
        return this.setCallerEmailNotificationsController;
    }

    async run(callerId: string, emailNotifications: boolean): Promise<void>{
        this.setCallerEmailNotificationsAplicationService.run(callerId, emailNotifications)
    }
}

export default SetCallerEmailNotificationsController;