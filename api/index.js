const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const home = require("./routes/home");
const users = require("./routes/users");
const auth = require("./routes/auth");
const app = express();

mongoose
  .connect("mongodb://localhost/soYum")
  .then(() => console.log("Connected to soYum DB..."))
  .catch(err =>
    console.log("There was an error connecting to the soYum DB....", err)
  );

app.use(express.json()); //if there is json in the req it will populate req.body
app.use(express.urlencoded({ extended: true })); //parses a key=value format and will populate req.body
app.use(express.static("public")); //this allows us to serve static content (folder is called public)
app.use(helmet());
app.use("/api", home);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Listening on port ${port}`));
