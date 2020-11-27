// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid =wxContext.OPENID
  var userdishlist=db.collection(openid).get()
  console.log("调用云函数获取用户数据库")
  return(userdishlist)
}