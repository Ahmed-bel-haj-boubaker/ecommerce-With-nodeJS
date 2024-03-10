// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');

const ApiError = ('../utils/apiError');

const multerOptions = ()=>{
    const multerStorage = multer.memoryStorage();  // the uploaded file is stored in the RAM of the server instead of being written to disk.
                                                   //This means that the file data resides in the volatile memory (RAM) of the server until it's processed by your application.    
                                                   //   Once the file has been processed or transferred to its final destination (if applicable), it's removed from memory.

    const multerFilter = function(req,file,cb){
        if(file.mimetype.startsWith('image')){ //image/jpeg, image/png, image/gif
            cb(null,true);// Call the callback function indicating success
        }else{
            cb(new ApiError('Only Images are allowed',400),false);
        }
    };

    const upload = multer({storage:multerStorage,fileFilter:multerFilter});
    return upload;
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);

exports.uploadMixOfImages = (arrayOfFields)=>multerOptions().fields(arrayOfFields);


