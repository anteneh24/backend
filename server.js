const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./routes/userRoute");
const movies = require("./routes/moviesRoute");
const port = process.env.port || 3000;

app.use(cors());

app.use(express.json());
app.use("/movie", movies);
app.use("/", user);

app.listen(3000, () => console.log("connnected"));
