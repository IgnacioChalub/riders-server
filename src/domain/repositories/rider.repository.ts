import Rider from "../entities/rider";

interface IRiderRepository{
    generateId(): Promise<string>;
    save(rider: Rider): void;
    getByDNIorEmail(DNI: number, emailAddress: string): Promise<Rider>;
    getByEmail(email: string): Promise<Rider>;
    getById(id: string): Promise<Rider>;
}

export default IRiderRepository;