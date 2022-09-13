const express = require("express");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes/user");
const fileUpload = require("express-fileupload");
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//Routes
// readdirSync("./routes").map((r) => app.use("/", require("./routes" + r)));
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));
// app.use("/", router);

//Database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection error : " + err.message));

app.listen(PORT, () => console.log("Connected to port " + PORT));
