import db from './../dataBase'
import { sendErrorMessage } from './../log/error'
export const getProjects = () => {
    return new Promise<Array<any>>((resolve, reject) => {
        db.query('SELECT * FROM project', (err, res) => {
            if (err)
                return sendErrorMessage(
                    '查询项目列表失败！无法连接数据库！',
                    err.message
                )
            return resolve(res)
        })
    })
}
