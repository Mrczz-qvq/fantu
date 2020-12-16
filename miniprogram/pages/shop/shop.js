const app = getApp()
const db=wx.cloud.database();
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname:"",
    canteennum:"",
    shopmsg:null,
    img_src:null,
    shopdec:"",
    iscollect: true,
    goods:[
    ]
  },
gotocanteen:function(event){
  console.log('传参到餐厅页面的参数 店名:',event.currentTarget.dataset.text)
  console.log('传参到餐厅页面的参数 食堂序号:',this.data.canteennum)
  wx.navigateTo({
      url: '../../pages/canteen/canteen?highlight='+event.currentTarget.dataset.text+'&canteennum='+this.data.canteennum // 传递高亮的店名称和所在食堂的序号
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.Shop)
    {
      console.log('获取当前超市名称：shop参数:',options.Shop,'获取当前食堂序号canteennum:',options.canteennum)
      that.setData({
        shopname:options.Shop,
        canteennum:options.canteennum  
      })//加载时务必保证每个页面到shop页面的参数成功传了 到shop页面途径:食堂点击√+刷一刷点击（等待后台数据ing）

      db.collection('store'+options.canteennum).where({
        'name':_.eq(options.Shop)
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的一条记录的数组
          console.log("在",'store'+options.canteennum,'搜索到该商店：',res.data[0].name)
          that.setData({
            img_src:res.data[0]['storeImg']//返回对应store的图片路径（目前只能返回一个）
          })
        }
      })
  
      db.collection('dishes').where({
        store:options.Shop,
        canteennum:parseInt(options.canteennum),
      })
      .get({
        success: function(res) {
          // res.data 是包含以上定义的一条记录的数组
          console.log("在dishes中搜索到商品：",res.data)
          that.setData({
            goods:res.data//返回改菜品的_id（目前只能返回一个）
          })
        }
      })
    }

    


  },

  collect: function(){
    this.setData({
        iscollect: !this.data.iscollect
    })
    console.log(this.data.iscollect);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '更多菜品还请移步食堂',
      icon:'none',
      duration:2000
     })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})