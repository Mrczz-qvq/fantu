// miniprogram/pages/personalcenter/personalcenter.js
const app = getApp();
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowUserName: false,
    avatarUrl: '',
    nickName: '',
    useropenid:'',
    isadmin:false,
    adminlist:['oxiQE5U1hMAAOsaQkaFeyLtH1XCY','oxiQE5R58BLz1YXmngfY0uHSPaEE','oxiQE5U-FPIZvDjwGKTyQmUj2wFA','oxiQE5ZT7kGs6YR1V9fr2Kjcv868','oxiQE5VnVLm2IyVQOU2nWcDiniW0','oxiQE5eGyS-hYkgOUKfLmabZpCvg']
  },
  
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
        //用户按了允许授权按钮
        var that = this;
        // 获取到用户的信息了，打印到控制台上看下
        app.globalData.userInfo = e.detail.userInfo
        console.log("全局变量内的用户信息：",getApp().globalData.userInfo)
        console.log("全局变量内的用户openid：",getApp().globalData.useropenid)
        //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
        that.setData({
            isShowUserName: true
        });
        that.onLoad()
    } else {
        //用户按了拒绝按钮
        wx.showModal({
            title: '提示',
            content: '您拒绝了授权，可能影响到程序使用',
            showCancel: false,
            confirmText: '返回',
            success: function(res) {
                // 用户没有授权成功，不需要改变 isHide 的值
                if (res.confirm) {
                    console.log('用户点击了“返回”');
                }
            }
        });
    }
  },
  onGotUserInfo: function (e) {
    var that=this

    if (e.detail.userInfo) {
      var user = e.detail.userInfo;
      this.setData({
        isShowUserName: true,
        userInfo: e.detail.userInfo,
      })
      console.log(user)

      wx.cloud.callFunction({
        name: 'login',// 云函数名称【刚刚创建的云函数文件的名字】
        data: {
        },
        success: function (res) {
          {
          console.log('openid：', res.result.openid)
          console.log('登陆 获取openid调用成功')    
          }},
        fail: console.error
      })
    } else {
      app._showSettingToast('登陆需要允许授权');
    }
    
  },

  onShow(options) {
    var user = app.globalData.userInfo;
    if (user && user.nickName) {
      this.setData({
        isShowUserName: true,
        userInfo: user,
      })
    }
  },
  tip:function()
  {
    wx.showToast({
      title:'请先登录',
      icon:'none',
      duration:1000
     })
  },
  tofootprint:function()
  {
    wx.navigateTo({
      url: '../../pages/personalcenter/footprint/footprint',
    })
  },
  toset:function()
  {
    wx.navigateTo({
      url: '../../pages/personalcenter/set/set',
    })
  },
  tolike:function()
  {
    wx.navigateTo({
      url: '../../pages/personalcenter/like/like',
    })
  },
  tipp:function()
  {
    wx.showToast({
      title:'即将开发',
      icon:'none',
      duration:1000
     })
  },
  myupload:function()
  {
    wx.navigateTo({
      url: '../../pages/personalcenter/myupload/myupload',
    })
  },
  toaudit:function()
  {
    wx.navigateTo({
      url: '../../pages/personalcenter/audit/audit',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl,
      nickName: getApp().globalData.userInfo.nickName,
      useropenid:getApp().globalData.useropenid
    })
    console.log('用户微信名称：',this.data.nickName)
    if(this.data.nickName.length != 0){
      console.log("人物信息已经获取 直接显示")
      this.setData({
        isShowUserName:true,
      })
    }
    for(var i= 0;i<6;i++)
    {
      if(this.data.useropenid==this.data.adminlist[i])
      {
        this.setData({
          isadmin:true,
        })
        wx.showToast({
          title: '管理员认证完成',
          icon: 'success',
          duration: 2000
          })
        break;
      }
    }
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
  
})