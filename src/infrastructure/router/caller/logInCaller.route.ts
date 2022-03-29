import LogInCallerController from "../../controllers/caller/logInCaller.controller";

const logInCaller = async ({input}: any): Promise<any> => {
    const {email, password} = input;
    const token: string = await LogInCallerController.getController().run(email, password);
    return {
        token: token
    }
}

export default logInCaller;