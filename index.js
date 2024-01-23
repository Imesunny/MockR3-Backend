const express = require("express");
const mongoDBConnection = require("./config/db");
const userRouter = require("./routes/user.routes");
const app = express();
const cors = require("cors");
const doctorRouter = require("./routes/doctor.routes");

require("dotenv").config();
const PORT = process.env.PORT;

console.log(PORT, "port is set");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/user", userRouter);
app.use('/doctor',doctorRouter)

app.get("/", (req, res) => {
  res.send("Welcome to Masai Hospital");
});

app.listen(PORT, async () => {
  try {
    await mongoDBConnection;
    console.log(`server listening on ${PORT}`);
  } catch (error) {
    console.log("error while listening", error);
  }
});
