// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var isadd =event.isadd
  if(isadd==1)
  {
    //数据库赞+1
    const _ = db.command
    db.collection('dishes').doc(event.dishid).update({
  		data:{
        zannum: _.inc(1)
    	}
   	})
    console.log("数据库赞+1")
    return("云端返回了数据库赞+1")
  }else
  {
    //数据库赞-1   
    const _ = db.command
    db.collection('dishes').doc(event.dishid).update({
  		data:{
        zannum: _.inc(-1)
    	}
   	})
    console.log("数据库赞-1")
    return("云端返回了数据库赞-1")
  }

  }