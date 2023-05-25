import db from './../dataBase'
import { sendErrorMessage } from './../log/error'

// 一次性获取全部用户信息数组
export const getAllUserInfo = () => {
    return new Promise<Array<any>>((resolve, reject) => {
        db.query('SELECT * FROM users', (err, res) => {
            if (err)
                return sendErrorMessage(
                    '查询用户数据失败！无法连接数据库！',
                    err.message
                )
            return resolve(res)
        })
    })
}

// 通过条件查找用户信息 getUserInfoByInfo(键,值,?是否返回数组) 是否返回数组为可选参数 如getUserInfoByInfo('username','admin')
export const getUserInfoByInfo = (info: string, val: any, more = false) => {
    return new Promise<any>((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE ${info} = ?`, val, (err, res) => {
            if (err) return sendErrorMessage('查询用户数据失败！', err.message)
            if (more) {
                return resolve(res)
            }
            return resolve(res[0])
        })
    })
}
