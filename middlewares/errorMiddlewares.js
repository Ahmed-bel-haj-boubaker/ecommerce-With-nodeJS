const globalError = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    if(process.env.NODE_ENV === 'development'){
      sendForDevMode(err,res);
    }else{
      sendForProductionMode(err,res);
    }
   
  };

  const sendForDevMode = (err,res)=>{
    return res.status(err.statusCode).json({
      status : err.status,
      error : err,
      message : err.message,
      stack : err.stack  // l emplacement de l erreur
     });
  };

  const sendForProductionMode = (err,res)=>{
    return res.status(err.statusCode).json({
      status : err.status,
      message : err.message,
     });
  };
  module.exports = globalError;