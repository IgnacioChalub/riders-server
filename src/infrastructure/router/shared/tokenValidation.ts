import jwt from "jsonwebtoken";

interface Payload{
    _id: string;
    _accountType: string;
    iat: number;
    exp: number;
}

export const tokenValidation = (token: string, accountTypeToValidate: string) => {
    try{
        if(!token) throw Error();
        const payload = jwt.verify(token, 'secretiveness') as Payload;
        const id = payload._id;
        const accountType = payload._accountType;
        if(accountType !== accountTypeToValidate) throw Error()
        return id;
    }catch(e: any){
        throw Error("Acces denied");
    }
}