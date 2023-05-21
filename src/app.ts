import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import config from './modules/getConfig'
import loginrouter from './router/login'
import expressJWT from 'express-jwt'
const app = express()

// 解析post
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// 允许跨域
app.use(cors())

// 解析token 
app.use(expressJWT({
    secret: config.secret,
    algorithms: ['HS256']
}).unless({path:[/^\/api\/public\//]}))

// 使用路由
app.use('/api/public', loginrouter)

// 劫持错误中间件
app.use((err:any,req:any,res:any,next:any)=>{
    if (err.name == 'UnauthorizedError') {
        return res.send({
            status:4003,
            msg:'鉴权失败'
        })
    }
    console.log(err);
    return res.send({
        status:5000,
        msg:'服务器错误'
    })
    
})

// 测试数据库连接
import './modules/testDb'

// 测试用
import '../test'

// 开启监听
app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}.`);
    
})

