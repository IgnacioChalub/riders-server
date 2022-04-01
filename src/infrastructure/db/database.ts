import {getConnectionManager} from "typeorm";
import {Caller} from "../../domain/entities/caller";
import Rider from "../../domain/entities/rider";
import Call from "../../domain/entities/call";
import 'dotenv/config'

const runDbConnection = async (): Promise<void> => {
    const port: number = <number><unknown>process.env.DB_PORT;
    const connectionManager = getConnectionManager();
    const connection = connectionManager.create({
        // connection name
        name: "db",
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
    })
    await connection.connect();
};

export default runDbConnection;
