var koa = require('koa')
var static = require('koa-static')
var path = require('path')
var app = new koa()
var reg = /^(?:[\w\/.]+)\.(?:[\w]+)$/

app.use(async function (ctx, next) {
  if (!reg.test(ctx.path) && ctx.path !== '/') {
    // due to we use vue router
    // we send index.html if the requst is not file and not root path
    // maybe can use kon-send
    ctx.path = '/'
  }
  await next()
})
app.use(static(path.join(path.dirname(__dirname), 'dist'), { gzip: true, defer: true }))

var port = process.env.PORT || 3000
app.listen(port)

console.log(`Start to serve static files at port: ${port}`)