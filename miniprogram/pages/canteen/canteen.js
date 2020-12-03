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
  canteennum:'', //当前食堂序号）
  storenow:''//当前对应数据库
  },

  btnclick:function (event) {
    console.log('传参给shop页点击的商店名字和当前餐厅序号:',event.currentTarget.dataset.text,"序号:",this.data.canteennum)
    wx.navigateTo({
      url: '/pages/shop/shop?Shop='+event.currentTarget.dataset.text+'&canteennum='+this.data.canteennum
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    this.setData({
      highlight:event.highlight,//接受其他页参数：高亮商家和当前食堂序号
      canteennum:event.canteennum,
      storenow:'store'+event.canteennum  //当前数据库
    })
    var that=this

    console.log('当前食堂：canteen'+this.data.canteennum)
    console.log('当前数据库：',this.data.storenow)

    db.collection(this.data.storenow).get().then(res => {
      this.setData({
        array1:res.data
      })
        console.log('第一次获取店铺：',res.data)
        
        db.collection(this.data.storenow).skip(20).get().then(res => { 
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


    console.log('高亮：',this.data.highlight)
    console.log('食堂序号：',this.data.canteennum)
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