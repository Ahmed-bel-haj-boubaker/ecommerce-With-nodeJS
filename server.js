const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("../ecommerce/config/database");
const categoryRoute = require("./routes/categoryRoute")
dotenv.config({ path: "config.env" });



//db connection
dbConnection();



// express app
const app = express();

// MiddleWare
app.use(express.json())// for parsing JSON responses ( extract the string value from the json to javascript object)
if (process.env.NODE_ENV === "development"){
    app.use(morgan('dev')); // morgan is used for logging HTTP requests like this GET / 200 3.077 ms - 18 ( morgan is a middleware module)
    console.log(`mode : ${process.env.NODE_ENV}`)
}

//Globale error handler middleware that is provided by Express
app.use((err,req,res,next)=>{
  res.status(404).json({err});
})

//Routes
app.use('/api/category',categoryRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});


