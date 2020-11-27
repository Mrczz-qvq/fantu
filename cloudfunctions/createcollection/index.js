const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var openid =wxContext.OPENID
  //先创建数据库 若失败则无事发生
  //此时更新用户表
  var usertableinfo=await db.collection('usertable').where({
    useropenid: openid
  }).get()
console.log(usertableinfo.data)

  if(usertableinfo.data ==  '')
  {
    console.log('usertableinfo.data == null')
    console.log('the user is not on the usertable')
    db.createCollection(openid)
    db.collection('usertable').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        useropenid:openid,
        userName:event.nickName,
        userimg:event.avatarUrl
      }
    })
    console.log('add info success')
    return('用户不在表内，数据库创建成功')
  }else{
    console.log('usertableinfo.data != null')
    console.log('the user is on the usertable')
    return('用户已在表内，无需再创建数据库')
  }





}