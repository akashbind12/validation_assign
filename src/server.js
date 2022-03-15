const app = require("./index");
const connect = require("./config/db");

app.listen(5000, async function () {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.error(err.message);
  }
});
