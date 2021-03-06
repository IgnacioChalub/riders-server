import ICallerRepository from "../../aplication/repositories/caller.repository";
import {Caller} from "../../domain/entities/caller";
import IdGeneratorImplementation from "../services/idGeneratorImplementation";
import {AppDataSource} from "../db/database";
import { Payment } from "../../domain/entities/payment";

class CallerDAO implements ICallerRepository{

    private static instance: ICallerRepository = new CallerDAO();

    private repository = AppDataSource.getRepository(Caller);
    private paymentRepository = AppDataSource.getRepository(Payment);
    private tableName = "caller";

    save(caller: Caller): void {
        this.repository.save(caller).then(r => r);
    }

    static getInstance(): ICallerRepository{
        return this.instance;
    }

    async getByDNIorEmail(DNI: number, emailAddress: string): Promise<Caller> {
        return <Caller>await this.repository.createQueryBuilder(this.tableName)
            .where("caller.DNI = :DNI", {DNI: DNI})
            .orWhere("caller.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getByEmail(emailAddress: string): Promise<Caller> {
        return <Caller>await this.repository.createQueryBuilder(this.tableName)
            .where("caller.emailAddress = :emailAddress", {emailAddress: emailAddress})
            .getOne();
    }

    async getById(id: string): Promise<Caller> {
        return <Caller>await this.repository.findOne({
            where: {
                // @ts-ignore
                id: id,
            },
        })
    }

    async generateId(): Promise<string> {
        const idGenerator: IdGeneratorImplementation = new IdGeneratorImplementation();
        let caller;
        let id;
        do {
            id = idGenerator.generateId();
            caller = await this.getById(id);
        } while (caller)
        return id;
    }

    async saveRating(caller: Caller): Promise<void> {
        await this.repository.save(caller)
    }

    async setEmailNotifications(caller: Caller): Promise<void> {
        await this.repository.update(caller.getId(),{
            // @ts-ignore
            emailNotifications: caller.recivesEmailNotifications()
        })
    }

    async saveNewBalance(caller: Caller): Promise<void> {
        await this.repository.update(caller.getId(),{
            // @ts-ignore
            balanceInCents: caller.getBalance()
        })
    }

    async savePayment(payment: Payment): Promise<void> {
        await this.paymentRepository.save(payment);
    }

    async getPayment(paymentId: string): Promise<Payment> {
        return <Payment>await this.paymentRepository.findOne({
            where: {
                // @ts-ignore
                paymentId: paymentId,
            },
        })
    }

}

export default CallerDAO;