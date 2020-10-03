const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = mongoose.connect("mongodb+srv://rishabh:Hh7gPh5QSePe9JsV@cluster0.idxsq.mongodb.net/<dbname>?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log("Db connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDb;