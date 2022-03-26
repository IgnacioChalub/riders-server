import jwt from "jsonwebtoken";

interface Payload{
    _id: string;
    _accountType: string;
    iat: number;
    exp: number;
}

export const riderTokenValidation = (token: string) => {
    if(!token) throw Error("Access denied");
    try{
        const payload = jwt.verify(token, 'secretiveness') as Payload;
        const id = payload._id;
        const accountType = payload._accountType;
        if(accountType !== "rider") throw Error('Access denied')
        return id;
    }catch (e) {
        throw Error('Invalid Token');
    }
}
