const fs = require('fs');
module.exports.getFileData = (filePath)=>{
  return new Promise ((resolve,reject)=>{
    console.log(filePath);
    fs.readFile(filePath,'utf-8',(error,data)=>{
      if(error){
        reject(error);
      }else{
        resolve(data);
      }
    })
  })
}