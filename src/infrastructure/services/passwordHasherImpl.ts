import IPasswordHasher from "../../domain/infrastructureServices/passwordHasher";
// @ts-ignore
import bcrypt from "bcrypt";

class PasswordHasherImplementation implements IPasswordHasher{
    async compare(password: string, hashedPassword: string): Promise<boolean> {
        const auth = await bcrypt.compare(password, hashedPassword)
        if (auth) {
            return true;
        } else {
            return false;
        }
    }

    hash(password: string): string {
        return bcrypt.hashSync(password, 5);
    }
}