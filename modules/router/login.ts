import express from 'express'
const router = express.Router()

import config from '../getConfig'

// token
import jwt from 'jsonwebtoken'

router.post('/login', (req, res) => {
    res.send({
        status:200,
        msg:'登录成功',
        token:jwt.sign({username:req.body.username},config.secret,{expiresIn:'30s'})
    })
})



export default router