// miniprogram/pages/personalcenter/like/like.js
const db=wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    updetail:[]
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
    var that=this;
    console.log("当前使用者openid",getApp().globalData.useropenid)

    db.collection('userupload').where({
     isaudit: false, //寻找未审核的菜
    })
    .get({
      success: function(res) {
        console.log("目前待审核序列",res.data)
        that.setData
        ({
          goods:res.data
        })
      }
    })  


    
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
  goshop:function(event){
    wx.navigateTo({
      url: '../../shop/shop?Shop='+event.currentTarget.dataset.text+'&canteennum='+event.currentTarget.dataset.num
    })
  },
  definedel:function(e){
    var that=this
    wx.showModal({
      title: '请再次确认',
      content: '是否删除该用户上传的内容',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          const delname = e.currentTarget.dataset.index; 
          console.log('要删除的上传菜：',delname)
            db.collection('userupload').where({
              img_name:delname
            }).remove({
              success: function(res) {
                wx.showToast({
                  title: "删除成功"
                })
                console.log('删除了待审核菜品 调用返回信息：',res)
              }
            })
            that.onReady()     

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  defineadd:function(e){
    var that=this
    wx.showModal({
      title: '请再次确认',
      content: '是否上传该用户上传的内容',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          const addname1 = e.currentTarget.dataset.index; 
          const addname2 = e.currentTarget.dataset.index; 
          const imgtext = e.currentTarget.dataset.tex2; 
          const dishstore = e.currentTarget.dataset.store; 
          const addimg = e.currentTarget.dataset.img_src; 
          const dishcanteen = e.currentTarget.dataset.dishcanteennum; 
          const uper = e.currentTarget.dataset.uper; 
          console.log('用户要上传的菜：',addname1,addname2,dishstore,addimg,imgtext,dishcanteen,uper)
            db.collection('dishes').add({
              data: {  
                  show2:true,
                  store: dishstore,
                  canteennum: dishcanteen,
                  talknum:0,
                  cainum:0,
                  img_name:addname1,
                  img_src:addimg,
                  img_tex2:imgtext,
                  talks:[],
                  zannum:0,
                  img_dislike:"../../images/menuicon/cai.png",
                  img_like:"../../images/menuicon/xin1.png",
                  img_tex1:addname1,
                  show1:true,
                  isaudit:true,
                  upuser:uper//此处为该产品上传用户的openid
                }
            }).then(res => {
              console.log('上传用户菜成功,调用返回信息:',res)
            })
            db.collection('userupload').where({
              _openid:uper,//此处为上传用户的openid
              img_name:addname1
             }).update({
              data: {
                isaudit: true
              },
              success: function(res) {
                  console.log('审核状态更新成功 返回信息：',res)
                }
              })





            that.onReady()                 
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})