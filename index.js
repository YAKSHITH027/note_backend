const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.routes");
require("dotenv").config();
const cors = require("cors");
const { noteRouter } = require("./routes/note.routes");
const { auth } = require("./middleware/auth.middleware");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use(auth);
app.use("/note", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("db is connected");
  } catch (error) {
    console.log("db is failed");
    console.log(error);
  }
  console.log("port is running in 8080");
});
