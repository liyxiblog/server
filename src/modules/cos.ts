import COS from 'cos-nodejs-sdk-v5'
import config from './getConfig'
const cos = new COS({
    SecretId: config.tencentsdk.SecretId,
    SecretKey: config.tencentsdk.SecretKey
})
export default cos
