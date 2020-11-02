const koa = require('koa');
const app = new koa();


const responseDuration = require('./middleware/koa_response_duration');
app.use(responseDuration);

const responseContentType = require('./middleware/koa_response_header');
app.use(responseContentType);

const responseData = require('./middleware/koa_response_data');
app.use(responseData);

app.listen(4500,()=>{
  console.log('serve is running')
});