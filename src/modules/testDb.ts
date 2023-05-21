import db from './dataBase'
import {sendErrorMessage} from './log/error'
import {sendInfoMessage} from './log/info'

// 测试数据库连接
db.query('select 1',(err,res)=>{
    if (err) {
        sendErrorMessage('连接数据库出错',err.message)
        process.exit(0)
    }
    sendInfoMessage('数据库连接成功')
})
