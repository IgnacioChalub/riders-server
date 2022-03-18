import {getConnectionManager} from "typeorm";
import {Caller} from "../../domain/entities/caller";

const runDbConnection = async (): Promise<void> => {
    const connectionManager = getConnectionManager();
    const connection = connectionManager.create({
        // connection name
        name: "db",
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "password",
        database: "riders-database",
        entities: [
            Caller
        ],
        synchronize: true,
    })
    await connection.connect();
};

export default runDbConnection;

