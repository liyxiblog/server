import { getUserInfoByInfo } from './../database/getUser'
import {
    getArticlesByPermission,
    getArticleByAid,
    getArticleListByUid,
    getArticleInfo,
    delArticle,
    editActicle,
    addActicle
} from './../../modules/database/getArticle'
import moment from 'moment'
import 'moment/locale/zh-cn'

// 获取完整文章列表
export const getArticleList = async (permission?: number) => {
    let userPermission = 0
    // 判断是否有登录
    // if (uid) {
    //     // 登录了 查找权限
    //     const userInfo = await getUserInfoByInfo('uid', uid)
    //     userPermission = userInfo.permission
    // }
    if (permission) {
        userPermission = permission
    }

    // 获取文章
    const data: any = await getArticlesByPermission(userPermission)

    if (!data) {
        return 5020
    }
    // 处理文章信息
    const newdata: any = await Promise.all(
        data.map(async (e: any) => {
            // 去除文章正文信息
            delete e.content
            // 覆盖文章作者信息
            const author: number = e.author
            const authorinfo: any = await getUserInfoByInfo('uid', author)
            e.author = {
                uid: authorinfo.uid,
                nick: authorinfo.nick
            }
            e.created_at = moment(e.created_at).format('MMM D, YYYY')
            e.updated_at = moment(e.updated_at).format('MMM D, YYYY')
            // 判断文章有没有密码
            if (e.password) {
                // 修改密码字段，覆盖文章简介信息
                e.description = '该文章受密码保护'
            }
            delete e.password
            return e
        })
    )

    return newdata
}

// 获取文章详细信息
export const getArticle = async (aid: number, reqinfo?: any) => {
    let userPermission = 0
    // 判断是否有登录
    if (reqinfo.uid) {
        // 登录了 查找权限
        const userInfo = await getUserInfoByInfo('uid', reqinfo.uid)
        userPermission = userInfo.permission
    }
    // 获取文章
    const data: any = await getArticleByAid(aid)
    if (!data) {
        return false
    }

    if (data == 403) {
        return 4033
    }

    // 判断用户有没有权限查看
    if (data.permission > userPermission) {
        return 4031
    }

    // 判断文章需不需要密码
    if (data.password) {
        // 用户是否提交了密码
        if (!reqinfo.password) {
            return 4032
        }
        // 密码是否正确
        if (data.password != reqinfo.password) {
            return 4032
        }
    }
    // 覆盖文章作者信息
    const author: number = data.author
    const authorinfo: any = await getUserInfoByInfo('uid', author)
    data.author = {
        uid: authorinfo.uid,
        nick: authorinfo.nick
    }

    // 处理时间
    data.created_at = moment(data.created_at).format('MMM D, YYYY')
    data.updated_at = moment(data.updated_at).format('MMM D, YYYY')

    delete data.password
    return data
}

// 用户列表获取自己的文章
export const getArticleListByUids = async (uid: number) => {
    const data: any = await getArticleListByUid(uid)
    const newdata = await Promise.all(
        data.map((e: any) => {
            // 处理时间
            e.created_at = moment(data.created_at).format('MMM D, YYYY')
            e.updated_at = moment(data.updated_at).format('MMM D, YYYY')
            // 去除文章正文信息
            delete e.content
            // 判断密码是否为空
            if (e.password == null) {
                e.password = ''
            }
            return e
        })
    )

    return newdata
}

// 编辑文章获取信息
export const getArticleInfos = async (uid: number, aid?: number) => {
    // 看看用户有没有获取这个文章的权限
    let articleData: any = null
    if (aid) {
        articleData = await getArticleInfo(aid)
        // 判断有没有这个文章
        if (!articleData) {
            return false
        }
        // 判断这个文章的状态是否正常
        if (articleData.status != 1 && articleData.status != 10) {
            return false
        }
        // 判断用户有没有权限编辑这个文章
        if (articleData.author != uid) {
            return 403
        }
        // 处理时间
        articleData.created_at = moment(articleData.created_at).format(
            'MMM D, YYYY'
        )
        articleData.updated_at = moment(articleData.updated_at).format(
            'MMM D, YYYY'
        )
        return articleData
    }
}

// 删除文章
export const delActicles = async (aid: any, uid: any) => {
    const res = await delArticle(aid, uid)
    if (res) {
        return true
    }
    return false
}

// 修改文章
export const editActicles = async (
    uid: number,
    aid: number,
    acticleInfo: any,
    permission: number
) => {
    const res = await editActicle(aid, acticleInfo, uid, permission)
    if (res == 200) {
        return 200
    }
    return 500
}

// 添加文章
export const addActicles = async (
    acticleInfo: any,
    uid: number,
    permission: number
) => {
    const res = await addActicle(acticleInfo, uid, permission)
    if (res == 200) {
        return 200
    }
    return 500
}
