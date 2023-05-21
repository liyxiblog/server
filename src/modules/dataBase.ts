import mysql from 'mysql'
import config from './getConfig'
const {host,user,password,database} = config.database
const db = mysql.createPool({
    host,
    user,
    password,
    database
})

export default db