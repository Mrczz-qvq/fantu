// miniprogram/pages/personalcenter/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      liketags:[
        {
          value:"1",
          tagname:"面食",
          istag:false,
        },
        {
          value:"2",
          tagname:"辣",
          istag:false,
        },

        {
          value:"4",
          tagname:"甜",
          istag:false,
        },
        {
          value:"7",
          tagname:"咸",
          istag:false,
        },
        {
          value:"8",
          tagname:"淡",
          istag:false,
        },
        {
          value:"9",
          tagname:"酸",
          istag:false,
        },
    
        
        
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  checkboxChange(e) {
   // console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.liketags
    console.log('checkbox发生change事件，携带value值为：', items)

    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].istag = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].istag = true
          break
        }
      }
    }

    this.setData({
      items
    })
  }
})
