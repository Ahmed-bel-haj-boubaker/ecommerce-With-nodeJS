const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddlewares");
const subCategoryRoute = require('./routes/subCategoryRoute');

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


//Routes
app.use('/api/category',categoryRoute);
app.use('/api/subCategory',subCategoryRoute);
app.all('*',(req,res,next)=>{
  // Create Error and send it to error handling middleware 
  // const err = new Error(`Can't find this Route: ${req.originalUrl}`);
  // next(err.message)
  //OR Create a new error custom class
  next(new ApiError(`Can't find this Route: ${req.originalUrl}`,400));  

})

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT} `);
});

// Handle Error rejection outside express
process.on('unhandledRejection',(err)=>{
  console.error(`Unhandled Rejection Errors : ${err.name} | ${err.message}`);
  server.close(()=>{
    console.error(`Shutting down... `);
    process.exit(1);
  })
});


