// miniprogram/pages/search/search.js
const app = getApp()
const db=wx.cloud.database();
const _=db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SearchKey:null,
    SearchResult:null,
        ans:[

          
        ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if(options.searchKey)
    {
      console.log('result',options.searchKey)
      that.setData({
        SearchKey:options.searchKey,
      })
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
    db.collection('dish').where({
      'img_name':
      {
        $regex:'.*' + options.searchKey + '.*',		//queryContent表示欲查询的内容，‘.*’等同于SQL中的‘%’
        $options: 'i'	
      }
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log("搜索成功",res.data)
        that.setData({
          ans:res.data//返回改菜品的_id（目前只能返回一个）
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
  goshop:function(event){
    console.log("商店名",event.currentTarget.dataset.text)
    wx.navigateTo({
      url: '../../pages/shop/shop?Shop='+event.currentTarget.dataset.text,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  getSearchKey(event) { //获取搜索词
    console.log("搜索词", event.detail.value)
    this.data.SearchKey = event.detail.value
  },

  goSearch(event) { //去搜索页
     db.collection('dish').where({
      'img_name':
      {
        $regex:'.*' + this.data.SearchKey + '.*',		
        $options: 'i'	
      }
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的一条记录的数组
        console.log("搜索成功",res.data)
        that.setData({
          ans:res.data//返回改菜品的_id（目前只能返回一个）
        })
      },
      
    })
    var that = this
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 1000
    })
    this.onLoad
  },
})