interface IPasswordHasher{
    hash(password: string): string;
    compare(password: string, hashedPassword: string): Promise<boolean>;
}

export default IPasswordHasher;