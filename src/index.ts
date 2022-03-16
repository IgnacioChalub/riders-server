import app from "./app";

const main = (): void => {
    const PORT = app.get('port')
    app.listen(PORT)
    console.log('Listening on port ',PORT);
};

main();