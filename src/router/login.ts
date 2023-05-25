import express from 'express'
import config from '../modules/getConfig'
import jwt from 'jsonwebtoken'
import { checkTicket } from './../modules/checkTicket'
import { getUserInfoByInfo } from './../modules/database/getUser'
const router = express.Router()

router.post('/login', (req, res) => {
    // res.send({
    //     status:200,
    //     msg:'登录成功',
    //     token:jwt.sign({username:req.body.username},config.secret,{expiresIn:'30s'})
    // })

    // 验证码
    const { ticket, randstr, username, password, keeplogin } = req.body
    if (!ticket || !randstr || !username || !password) {
        res.send({
            status: 400,
            msg: '不合法的登录参数！'
        })
        return
    }

    checkTicket(ticket, randstr, (result) => {
        if (result === 1) {
            // 验证通过
            // 验证身份 检查密码是否正确
            ;(async () => {
                const dbback = await getUserInfoByInfo('username', username)
                if (!dbback) {
                    return res.send({
                        status: 4013,
                        msg: '账号或密码错误'
                    })
                }
                if (password == dbback.password) {
                    // 计算过期时间
                    const date = new Date().getTime()
                    if (keeplogin) {
                        return res.send({
                            status: 2001,
                            msg: '登录成功',
                            expiredTime: date + 1000 * 60 * 60 * 24 * 7,
                            token: jwt.sign(
                                {
                                    uid: dbback.uid,
                                    username: dbback.username,
                                    nick: dbback.nick,
                                    email: dbback.email,
                                    permission: dbback.permission,
                                    status: dbback.status,
                                    msg: '虽然没有什么用，但是我还是想要返回一下'
                                },
                                config.secret,
                                { expiresIn: '7d' }
                            )
                        })
                    }
                    return res.send({
                        status: 2002,
                        msg: '登录成功',
                        expiredTime: date + 1000 * 60 * 60 * 2,
                        token: jwt.sign(
                            {
                                uid: dbback.uid,
                                username: dbback.username,
                                nick: dbback.nick,
                                email: dbback.email,
                                permission: dbback.permission,
                                status: dbback.status,
                                msg: '虽然没有什么用，但是我还是想要返回一下'
                            },
                            config.secret,
                            { expiresIn: '2h' }
                        )
                    })
                }
                return res.send({
                    status: 4013,
                    msg: '账号或密码错误'
                })
            })()
        } else if (result === -1) {
            // 接口已失效
            res.send({
                status: 5010,
                msg: '接口已失效'
            })
        } else if (result === 0) {
            // 验证不通过
            res.send({
                status: 4093,
                msg: '验证码不通过'
            })
        }
    })
})

export default router
