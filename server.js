const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
dotenv.config({ path: "config.env" });

//Connect to dataBase
mongoose.connect(process.env.DB_URI).then(
    (conn)=>{
        console.log(`DataBase Connected : ${conn.connection.host}`);
    }
).catch(
    (err)=>{
        console.log(`error with connecting to dataBase: ${err}`);
        process.exit(true);
    }
)


const app = express();
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev')); // morgan is used for logging HTTP requests like this GET / 200 3.077 ms - 18 ( morgan is a middleware module)
    console.log(`mode : ${process.env.NODE_ENV}`)
}
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Welcome to express");
});
