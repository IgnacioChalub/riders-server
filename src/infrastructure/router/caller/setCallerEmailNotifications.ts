import {Request} from "express";
import SetCallerEmailNotificationsController from "../../controllers/caller/setCallerEmailNotifications";
import {tokenValidation} from "../shared/tokenValidation";

const setCallerEmailNotifications = async (args: any, req: Request): Promise<void> => {
    const token: string = <string>req.headers['auth-token'];
    const id: string = tokenValidation(token, "caller");
    const { emailNotifications } = args.input;
    return SetCallerEmailNotificationsController.getController().run(id, emailNotifications);
}

export default setCallerEmailNotifications;