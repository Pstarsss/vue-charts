module.exports = async (ctx,next)=>{
  let first =  Date.now();
  ctx.response.body = 'ddd';
  await next();
  let second = Date.now();
  const duration = second - first;
  ctx.set('X-response-Time',duration+'ms');
}