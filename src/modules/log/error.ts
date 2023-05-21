export const sendErrorMessage = (tips:string,errormsg:string,error?:any)=>{
    console.log(`[错误]程序运行出错！${tips}（${errormsg}）`);
    if (error) {
        console.log(error);
    }
}
// todo : 邮件提醒