const morgan = require("morgan");
const express = require("express");
const app = express();
const routes = require("./routes/router");
const dotenv = require('dotenv');


// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes//
app.use("/api", routes);

// Ajustes del servidor
app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);  
});
dotenv.config();
