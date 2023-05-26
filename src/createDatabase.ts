import db from './modules/dataBase'
const dbStr = [
    `
create table article
(
    aid         int auto_increment
        primary key,
    status      int default 2 not null,
    title       varchar(255)  not null,
    created_at  datetime      not null,
    updated_at  datetime      not null,
    author      int(255)      not null,
    description text          not null,
    content     longtext      not null,
    permission  int           not null,
    password    varchar(255)  null
)
`,
    `
create table project
(
    pid         int auto_increment
        primary key,
    projectname varchar(45)                        not null,
    img         varchar(512)                       not null,
    projectinfo varchar(512)                       not null,
    projectlink varchar(45) default 'javascript:;' not null
)
`,
    `create table users
(
    uid        int auto_increment
        primary key,
    status     int default 1 not null,
    nick       varchar(45)   not null,
    username   varchar(45)   not null,
    password   varchar(45)   not null,
    email      varchar(45)   not null,
    permission int default 1 not null
)`
]

dbStr.forEach((e) => {
    db.query(e, (err, res) => {
        if (err) {
            console.log(err)
            return console.log('初始化失败！')
        } else {
            console.log('创建成功')
        }
    })
})
