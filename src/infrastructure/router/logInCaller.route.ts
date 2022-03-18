import LogInCallerControllerProvider from "../controllersProviders/caller/logInCaller.controllerProvider";

const logInCaller = async ({input}: any): Promise<any> => {
    const { email, password} = input;
    const token: string = await LogInCallerControllerProvider.getController().logIn(email, password);
    return {
        token: token
    }
}

export default logInCaller;