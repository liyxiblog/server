import express from 'express'
const router = express.Router()

router.post('/test',(req,res)=>{
    res.send({
        status:200,
        data:req.user
    })
})


export default router