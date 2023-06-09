import {
    getArticleList,
    getArticle,
    getArticleListByUids,
    getArticleInfos,
    delActicles,
    editActicles,
    addActicles
} from './../modules/method/articleFn'
import cos from './../modules/cos'
import express from 'express'
import type { Request } from './../types/express'
import config from './../modules/getConfig'
import multer from 'multer'
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
router.post('/editActicle', async (req: Request, res) => {
    // 所有参数都不能为空
    if (
        !req.body ||
        !req.body.aid ||
        !req.body.title ||
        !req.body.description ||
        !req.body.content ||
        !req.body.permission
    ) {
        // 判断权限是否为空
        if (req.body.permission !== 0) {
            return res.send({
                status: 400,
                msg: '非法的参数'
            })
        }
    }

    // 写入数据
    const data = await editActicles(
        req.user.uid,
        req.body.aid,
        req.body,
        req.user.permission
    )
    if (data == 200) {
        return res.send({
            status: 200,
            msg: '修改文章成功'
        })
    }
    if (data == 500) {
        return res.send({
            status: 500,
            msg: '修改文章数据失败'
        })
    }
    return res.send({
        status: 500,
        msg: '未知错误'
    })
})

// 新建文章
router.post('/addActicle', async (req: Request, res) => {
    // 所有参数都不能为空
    if (
        !req.body ||
        !req.body.title ||
        !req.body.description ||
        !req.body.content ||
        !req.body.permission
    ) {
        // 判断权限是否为空
        if (req.body.permission !== 0) {
            return res.send({
                status: 400,
                msg: '非法的参数'
            })
        }
    }

    // 写入数据
    const data = await addActicles(req.body, req.user.uid, req.user.permission)
    if (data == 200) {
        return res.send({
            status: 200,
            msg: '添加文章成功'
        })
    }
    if (data == 500) {
        return res.send({
            status: 500,
            msg: '添加文章失败'
        })
    }
    return res.send({
        status: 500,
        msg: '未知错误'
    })
})

// 配置 multer 中间件
const upload = multer({
    storage: multer.memoryStorage() // 使用内存存储引擎
})

// 上传图片
router.post('/uploadimg', upload.single('uimgs'), (req: Request, res) => {
    // 检查文件是否存在
    if (!req.file) {
        return res.send({
            status: 400,
            msg: '就这？我还没尽兴呢！'
        })
    }

    // 获取文件
    const file = req.file

    // 验证文件类型和大小
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.mimetype)) {
        return res.send({
            status: 4051,
            msg: '不行...这样的..唔...不..不可以❤..坏掉了❤'
        })
    }
    // 限制文件大小 太大了装不下呜呜
    const maxSizeInBytes = 2 * 1024 * 1024
    if (file.size > maxSizeInBytes) {
        return res.send({
            status: 4052,
            msg: '这..这...他他他....太太太...大...大的...〇〇不可以..嗯~..哈啊啊~~'
        })
    }

    // 设置文件名
    const fileName = `/liyxiblog/${req.user.uid}/${new Date().getTime()}_${
        file.originalname
    }`

    // 配置 COS SDK 上传参数
    const uploadParams = {
        Bucket: config.tencentsdk.cos.Bucket,
        Region: config.tencentsdk.cos.Region,
        Key: fileName,
        Body: file.buffer
    }

    // 调用 COS SDK 的 putObject 方法上传文件
    cos.putObject(uploadParams, (err, data) => {
        if (err) {
            console.error(err)
            res.send({
                status: 500,
                msg: '失败了呢~'
            })
        } else {
            res.send({
                status: 200,
                msg: '好耶！成功力！',
                url: `https://alongwblog.alongw.cn${fileName}`,
                desc: file.originalname
            })
        }
    })
})

export default router
