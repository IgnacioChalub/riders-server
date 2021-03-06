import {DataSource} from "typeorm";
import {Caller} from "../../domain/entities/caller";
import Rider from "../../domain/entities/rider";
import Call from "../../domain/entities/call";
import 'dotenv/config'
import {Location} from "../../domain/entities/location";
import {Ride} from "../../domain/entities/ride";
import { Payment } from "../../domain/entities/payment";


const toBool = (string: String) => {
    if(string === 'true') return true;
    else if(string === 'false') return false;
};

const port: number = <number><unknown>process.env.DB_PORT;      
const ssl: boolean|undefined = toBool(<string><unknown>process.env.SSL);
const AppDataSource: DataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        Caller,
        Rider,
        Call,
        Location,
        Ride,
        Payment
    ],
    synchronize: true,
    ssl: ssl
})

const runDbConnection = async (): Promise<void> => {
    await AppDataSource.initialize();
};

export {AppDataSource};
export default runDbConnection;
