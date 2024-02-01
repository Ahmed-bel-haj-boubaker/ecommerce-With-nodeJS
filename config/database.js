const mongoose = require("mongoose");


const dbConnection = ()=> {
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
};

module.exports = dbConnection