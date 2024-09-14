const express = require("express");
const Auth = require("./routes/auth.routes.js");
const Notes = require("./routes/notes.routes.js");
const cors = require("cors");
const connectDB = require("./DB.js");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB database.
connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log(`App is listening on port 8000`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });


// declaration of routes.
app.use("/api/auth", Auth);
app.use("/api/notes", Notes);

//http://localhost:8000/api/auth