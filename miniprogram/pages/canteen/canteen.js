// pages/Restaurant1/Restaurant1.js
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
  array1:[],
  array0:[],
  array:[],
  highlight:'',
  storenow:''
  },

  btnclick:function (event) {
    console.log('传参给shop页点击的商店名字:',event.currentTarget.dataset.text)
    wx.navigateTo({
      url: '/pages/shop/shop?Shop='+event.currentTarget.dataset.text
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    var that=this
    db.collection('store1').get().then(res => {
      this.setData({
        array1:res.data
      })
        console.log('第一次获取店铺：',res.data)
        db.collection('store1').skip(20).get().then(res => { 
          that.setData({
            array0:res.data
          })
          console.log('第二次获取店铺：',res.data)
          that.data.array=that.data.array1.concat(that.data.array0)     
          that.setData({
            array:that.data.array
          })       
          console.log('获取所有店铺：',that.data.array)
        })
    })

    this.setData({
      highlight:event.highlight,//接受参数：高亮商家
      canteennow:event.canteennum
    })
    console.log('高亮：',this.data.highlight)
    console.log('食堂序号：',this.data.canteennow)
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