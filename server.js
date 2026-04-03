const app = require('./index');
const connect = require('./configs/db');
require('dotenv').config();

app.listen(3001, async () => {
    await connect();
    console.log("Listening on port 3001");
});