const path = require('path');
const file = require('../utils/file_utils');
module.exports = async (ctx,next)=>{

  
  let url = (ctx.request.url).replace('/api','');
  console.log(ctx.request.url);
  let path1 = `../data/${url}.json`;
  let path2 = path.join(__dirname,path1);
  try{
    let results = await file.getFileData(path2);
    ctx.response.body = results;
  }catch(error){
    let err = {
      message:error,
      status:404
    }
    ctx.response.body = err;
  }
 
  await next();
};