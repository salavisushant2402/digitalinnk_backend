const app = require('./index');
const connect = require('./configs/db');
require('dotenv').config();

console.log("Connect function:", connect); // debug
app.listen(3001, async () => {
    await connect();
    console.log("🚀 Listening on port 3001");
});