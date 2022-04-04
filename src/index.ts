import app from "./app";
import runDbConnection from "./infrastructure/db/database";

const main = (): void => {
    const PORT = app.get('port')
    app.listen(PORT)
    runDbConnection().then(r => r)
    console.log('Listening on port ',PORT);
};


main();
