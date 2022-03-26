
class IdGeneratorImplementation{
    generateId(): string {
        return require('crypto').randomBytes(10).toString('hex');
    }
}

export default IdGeneratorImplementation;