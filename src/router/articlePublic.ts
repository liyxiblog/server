import { getArticleList, getArticle } from './../modules/method/articleFn'
import express from 'express'
const router = express.Router()

// 游客获取文章接口
router.get('/getArticleList', async (req, res) => {
    let data = await getArticleList()
    if (!data) {
        return res.send({
            status: 5020,
            msg: '获取文章信息失败'
        })
    }
    data.reverse()
    return res.send({
        status: 2020,
        msg: '获取文章信息成功！',
        data
    })
})

// 游客获取文章内容
router.get('/getArticle', async (req, res) => {
    if (!req.query || !req.query.aid) {
        return res.send({
            status: 4020,
            msg: '未提供AID'
        })
    }
    const data = await getArticle(req.query.aid as any, {
        uid: null,
        password: req.query.password
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
    if (data == 4033) {
        return res.send({
            status: 5030,
            msg: '错误，未找到'
        })
    }

    return res.send({
        status: 200,
        msg: '获取文章数据成功！',
        data
    })
})

export default router
