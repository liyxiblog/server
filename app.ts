import express from 'express'
const app = express()
// 解析post
import bodyParser from 'body-parser'
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// 允许跨域
import cors from 'cors'
app.use(cors())
// 导入配置文件
import config from './modules/getConfig'

// token 
import expressJWT from 'express-jwt'
app.use(expressJWT({
    secret: config.secret,
    algorithms: ['HS256']
}).unless({path:[/^\/api\/public\//]}))

// 使用路由
import loginrouter from './modules/router/login'
app.use('/api/public', loginrouter)
import test from './modules/router/test'
app.use('/api',test)

// 错误中间件
app.use((err:any,req:any,res:any,next:any)=>{
    if (err.name == 'UnauthorizedError') {
        return res.send({
            status:403,
            msg:'鉴权失败'
        })
    }
    console.log(err);
    return res.send({
        status:500,
        msg:'服务器错误'
    })
    
})

// 开启监听
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}.`);
    
})

