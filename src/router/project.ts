import express from 'express'
import { getProjects } from './../modules/database/getProject'
const router = express.Router()

router.get('/getProject', async (req, res) => {
    let data = await getProjects()
    if (!req.query || !req.query.re) {
        return res.send({
            status: 2011,
            msg: '项目列表请求成功！',
            data
        })
    }
    data.reverse()
    return res.send({
        status: 2012,
        msg: '项目列表请求成功！',
        data
    })
})

export default router
