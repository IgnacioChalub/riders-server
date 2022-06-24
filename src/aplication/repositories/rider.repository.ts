import Rider from "../../domain/entities/rider";

interface IRiderRepository{
    generateId(): Promise<string>;
    save(rider: Rider): void;
    getByDNIorEmail(DNI: number, emailAddress: string): Promise<Rider>;
    getByEmail(email: string): Promise<Rider>;
    getById(id: string): Promise<Rider>;
    saveRating(rider: Rider): Promise<void>;
    saveNewBalance(riderId: Rider): Promise<void>;
}

export default IRiderRepository;