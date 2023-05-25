import db from './../dataBase'
import { sendErrorMessage } from './../log/error'
export const getArticlesByPermission = (permission: number) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM article WHERE permission <= ? AND status = 1',
            permission,
            (err, res) => {
                if (err) {
                    return sendErrorMessage(
                        '请求文章列表失败！可能是因为无法连接数据库或者没有符合条件的文章！',
                        err.message
                    )
                }
                return resolve(res)
            }
        )
    })
}

export const getArticleByAid = (aid: number) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM article WHERE aid = ?', [aid], (err, res) => {
            if (err) {
                return sendErrorMessage(
                    '查找文章失败，可能是因为提供了错误的uid！',
                    err.message
                )
            }
            if (res[0].status == 1 || res[0].status == 10) {
                return resolve(res[0])
            }
            return resolve(403)
        })
    })
}

export const getArticleListByUid = (uid: number) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM article WHERE author = ? AND status IN (1,2,-2,-3,10)',
            [uid],
            (err, res) => {
                if (err) {
                    return sendErrorMessage(
                        '查找文章失败，可能是因为提供了错误的uid！',
                        err.message
                    )
                }

                return resolve(res)
            }
        )
    })
}

export const getArticleInfo = (aid: number) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM article WHERE aid = ?', [aid], (err, res) => {
            if (err) {
                return sendErrorMessage(
                    '查找文章失败，可能是因为提供了错误的uid！',
                    err.message
                )
            }

            return resolve(res[0])
        })
    })
}

// 删除文章
export const delArticle = (aid: number, uid: number) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE article SET status = -1 WHERE aid = ? AND author = ?',
            [aid, uid],
            (err, res) => {
                if (err) {
                    return sendErrorMessage('删除文章失败！', err.message)
                }

                return resolve(true)
            }
        )
    })
}
