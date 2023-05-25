import {
    getArticleList,
    getArticle,
    getArticleListByUids,
    getArticleInfos,
    delActicles
} from './../modules/method/articleFn'
import express from 'express'
import type { Request } from './../types/express'
const router = express.Router()

// 携带身份用户获取文章接口
router.post('/getArticleList', async (req: Request, res) => {
    let data = await getArticleList(req.user.permission)
    if (!data) {
        return res.send({
            status: 5021,
            msg: '获取文章信息失败'
        })
    }
    data.reverse()
    return res.send({
        status: 2021,
        msg: '获取文章信息成功！',
        permission: req.user.permission,
        data
    })
})

// 携带身份用户获取文章信息
router.post('/getArticle', async (req: Request, res) => {
    if (!req.body || !req.body.aid) {
        return res.send({
            status: 4020,
            msg: '未提供AID'
        })
    }
    const data = await getArticle(req.body.aid as any, {
        uid: req.user.uid,
        password: req.body.password
    })
    if (data == false) {
        return res.send({
            status: 5030,
            msg: '错误，未找到'
        })
    }
    if (data == 4032) {
        return res.send({
            status: 4032,
            msg: '鉴权失败，您无权请求此文章'
        })
    }
    if (data == 4031) {
        return res.send({
            status: 4031,
            msg: '限权不足'
        })
    }

    return res.send({
        status: 200,
        msg: '获取文章数据成功！',
        data
    })
})

// 用户个人主页获取信息
router.post('/userMain', async (req: Request, res) => {
    const pagedata = await getArticleListByUids(req.user.uid)
    return res.send({
        status: 200,
        msg: '获取个人页信息成功！',
        data: {
            articleList: pagedata
        }
    })
})

// 编辑文章获取信息
router.post('/getActicleInfo', async (req: Request, res) => {
    const back = await getArticleInfos(req.user.uid, req.body.aid)
    if (!back) {
        return res.send({
            status: 5030,
            msg: '获取文章信息失败'
        })
    }
    if (back == 403) {
        return res.send({
            status: 4035,
            msg: '拒绝访问'
        })
    }

    return res.send({
        status: 200,
        msg: '获取文章信息成功',
        data: back
    })
})

// 删除文章
router.post('/delActicle', async (req: Request, res) => {
    if (!req.body || !req.body.aid) {
        return res.send({
            status: 400,
            msg: '必须携带删除参数'
        })
    }
    const back = await delActicles(req.body.aid, req.user.uid)
    if (back) {
        return res.send({
            status: 200,
            msg: '删除成功'
        })
    }
    return res.send({
        status: 500,
        msg: '删除失败'
    })
})

// 修改文章
router.post('/editActicle', (req, res) => {
    // 所有参数都不能为空
    if (
        !req.body ||
        !req.body.aid ||
        !req.body.title ||
        !req.body.description ||
        !req.body.content ||
        !req.body.permission ||
        !req.body.password
    ) {
        return {
            status: 400,
            msg: '非法的参数'
        }
    }

    // tudo：做到这儿呢~
})

export default router
