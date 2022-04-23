//dependencies
const fs = require('fs');
const path = require('path');
//app object
const lib ={};

//base directory where the file will be saved
lib.basedir = path.join(__dirname,'/../.data/');

//create file
lib.create = (dir,file,data,callback)=>{
    //open the file
    fs.open(`${lib.basedir + dir}/${file}.json`,'wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor)
        {
            //conver data to str
            const stringData = JSON.stringify(data);

            //write in the file
            fs.writeFile(fileDescriptor,stringData,(err)=>{
                if(!err)
                {
                    fs.close(fileDescriptor,(err)=>{
                        if(!err)
                        {
                            callback(false);
                        }else{
                            callback("Error in closing file.")
                        }
                    })
                }else{
                    callback('Error in writing in the file.')
                }
            })
        }else{
            callback(err);
        }
    });

}

lib.read =(dir,file,callback)=>{
    fs.readFile(`${lib.basedir + dir}/${file}.json`,'UTF-8',(err,data)=>{
        callback(err,data);
    })
}

lib.update = (dir,file,data,callback)=>{
    fs.open(`${lib.basedir + dir}/${file}.json`,'r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor)
        {
            //conver data to str
            const stringData = JSON.stringify(data);

            //write in the file
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err)
                {
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err)
                        {
                            fs.close(fileDescriptor,(err)=>{
                                if(!err)
                                {
                                    callback(false);
                                }else{
                                    callback("Error in closing file.");
                                }
                            })
                        }else{
                            callback('Error in writing in the file.');
                        }
                    })
                }else{
                    callback('Error in truncating file.');
                }
            })
        }else{
            callback(err);
        }
    });
}

lib.delete = (dir,file,callback)=>{
    fs.unlink(`${lib.basedir + dir}/${file}.json`,(err)=>{
        if(!err)
        {
            callback(false);
        }else{
            callback('Error in deleting file.');
        }
    })
}
module.exports = lib;