import fs from 'fs'
// 判断有没有配置文件 如果没有就复制
try {
    fs.readFileSync('./config.json', 'utf8')
} catch (error) {
    fs.copyFileSync('./examplefile/config.json', './config.json')
    console.log('检测到首次启动，正在生成配置文件，配置文件已生成，请修改！');
    process.exit(0)
}

// 读取配置文件
const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'))
// 导出配置文件
export default config