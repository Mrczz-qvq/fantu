// miniprogram/pages/personalcenter/like/like.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    console.log(getApp().globalData.useropenid)

    db.collection('userupload').where({
      _openid: getApp().globalData.useropenid,
    })
    .get({
      success: function(res) {
        console.log(res.data)
        that.setData
        ({
          goods:res.data
        })
      }
    })  


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

  },
  goshop:function(){
    wx.navigateTo({
      url: '../../shop/shop',
    })
  },

  dellove:function(e){
    const delname = e.currentTarget.dataset.index; 
    console.log('要删除的上传菜：',delname)
    db.collection('userupload').where({
      _openid:getApp().globalData.useropenid,
      img_name:delname
     }).remove({
        success: function(res) {
          wx.showToast({
            title: "删除成功"
          })
          console.log('删除了待审核菜品 调用返回信息：',res)
  
        }
      })
      this.onReady()




  }
})