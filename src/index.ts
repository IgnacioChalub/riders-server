import app from "./app";
import runDbConnection from "./infrastructure/db/database";
import {server} from "./infrastructure/socket/socketServer";

const main = (): void => {
    const PORT = app.get('port');
    server.listen(PORT);
    runDbConnection().then(r => r)
    console.log('Listening on port ',PORT);
};

main();
