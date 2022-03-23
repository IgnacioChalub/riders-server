import jwt from 'jsonwebtoken'
import ILogger from "../../domain/infrastructureServices/logger";

class JWTLogger implements ILogger{
    login(accountId: string, accountType: string): string {
        return jwt.sign({_id: accountId, _accountType: accountType}, 'secretiveness', {
            expiresIn: 60 * 60 * 24 // 24 hours
        });
    }
}

export default JWTLogger;