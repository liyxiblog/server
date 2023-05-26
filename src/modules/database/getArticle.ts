import db from './../dataBase'
import { sendErrorMessage } from './../log/error'
import moment from 'moment'
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

export const getArticleByAid = (aid: any) => {
    return new Promise((resolve, reject) => {
        // 过滤奇妙的请求
        if (!/^-?\d+(\.\d+)?$/.test(aid)) {
            return resolve(403)
        }
        db.query('SELECT * FROM article WHERE aid = ?', [aid], (err, res) => {
            if (err) {
                return sendErrorMessage(
                    '查找文章失败，可能是因为提供了错误的uid！',
                    err.message
                )
            }
            // 过滤奇妙的请求
            if (!res[0]) {
                return resolve(403)
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

// 修改文章
export const editActicle = (
    aid: number,
    articleInfo: any,
    uid: number,
    permission: number
) => {
    return new Promise((resolve, reject) => {
        // 权限大于5的账户无需审核
        let status = 2
        if (permission >= 5) {
            status = 1
        }
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        db.query(
            'UPDATE article SET status = ?, updated_at = ?, title = ?, description = ?, content = ?, permission = ?, password = ? WHERE aid = ? AND author = ?',
            [
                status,
                date,
                articleInfo.title,
                articleInfo.description,
                articleInfo.content,
                articleInfo.permission,
                articleInfo.password,
                articleInfo.aid,
                uid
            ],
            (err, res) => {
                if (err) {
                    return sendErrorMessage('更新文章失败！', err.message)
                }
            }
        )
        return resolve(200)
    })
}

export const addActicle = (
    articleInfo: any,
    uid: number,
    permission: number
) => {
    return new Promise((resolve, reject) => {
        // 权限大于5的账户无需审核
        let status = 2
        if (permission >= 5) {
            status = 1
        }
        const date = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        db.query(
            'INSERT INTO article (title, description, content, author, created_at, updated_at, status, permission, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                articleInfo.title,
                articleInfo.description,
                articleInfo.content,
                uid,
                date,
                date,
                status,
                articleInfo.permission,
                articleInfo.password
            ],
            (error, result) => {
                if (error) {
                    return sendErrorMessage('创建文章失败！', error.message)
                }
            }
        )
        return resolve(200)
    })
}
