const app = getApp()
const db=wx.cloud.database();
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopname:"",
    shopmsg:null,
    img_src:null,
    shopdec:"食惠快餐是一家主营快餐的店铺,这里有许多种类的荤菜和素菜,方便快捷",
    imgUrls: [
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3238431746,4177294693&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3482112846,1616623641&fm=26&gp=0.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1066721984,714626582&fm=26&gp=0.jpg'
  ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200,
    iscollect: true,
    goods:[
     
    ]
  },
  gotocanteen:function(){
wx.navigateTo({
  url: '../../pages/canteen/canteen',
})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.Shop)
    {
      console.log('Shop',options.Shop)
      that.setData({
        shopname:options.Shop,
      })
    }
    db.collection('dish').where({
      'store':_.eq(options.Shop)
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log("搜索成功",res.data)
        that.setData({
          goods:res.data//返回改菜品的_id（目前只能返回一个）
        })
      }
    })
    db.collection('store1').where({
      'name':_.eq(options.Shop)
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log("搜索成功",res.data)
        that.setData({
          img_src:res.data[0]['storeImg']//返回改菜品的_id（目前只能返回一个）
        })
      }
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})