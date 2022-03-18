import app from "./app";
import runDbConnection from "./infrastructure/db/database";
import CallerDAO from "./infrastructure/persistance/callerDAO";
import {getRepository} from "typeorm";
import {Caller} from "./domain/entities/caller";

const main = (): void => {
    const PORT = app.get('port')
    app.listen(PORT)
    console.log('Listening on port ',PORT);
};

main();
runDbConnection().then(r => {
   console.log("DB connected")
});

