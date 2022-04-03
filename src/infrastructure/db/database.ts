import {DataSource} from "typeorm";
import {Caller} from "../../domain/entities/caller";
import Rider from "../../domain/entities/rider";
import Call from "../../domain/entities/call";
import 'dotenv/config'

const port: number = <number><unknown>process.env.DB_PORT;
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
        Call
    ],
    synchronize: true,
    migrations: [
        "src/infrastructure/db/migrations/*.ts"
    ],
    cli: {
        migrationsDir: "src/infrastructure/db/migrations"
    }
})

const runDbConnection = async (): Promise<void> => {
    await AppDataSource.initialize();
};



export {AppDataSource};

export default runDbConnection;
