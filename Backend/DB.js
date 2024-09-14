const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://uvaishnasir:uvaish123@cluster0.9pmjpa2.mongodb.net";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(mongoURI);
    console.log(
      `\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error(`Error connecting to MongoDB Failed: ${error}`);
    process.exit(1);
  }
};
module.exports = connectDB;
