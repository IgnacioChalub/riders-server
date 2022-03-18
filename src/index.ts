import app from "./app";
import runDbConnection from "./infrastructure/db/database";

const main = (): void => {
    const PORT = app.get('port')
    app.listen(PORT)
    console.log('Listening on port ',PORT);
};

main();
runDbConnection().then(r => {
   console.log("DB connected")
});

