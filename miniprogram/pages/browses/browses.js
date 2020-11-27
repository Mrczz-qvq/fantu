// miniprogram/pages/browses/browses.js
const db=wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    click: false, //是否显示弹窗内容
    option: false, //显示弹窗或关闭弹窗的操作动画
    touchStart: 0,
    inputValue: '',
    inputBiaoqing: '',


   video_list:[
/*shopname:"店铺名*/
   ],
   pageY:'',    // 触摸起始高度坐标
   animation:'',  // 视频划动动画
   up_stroke:false,// ture:上划；false：下划
   difference:'', // 拖动的距离
   windowHeight:'',// 屏幕高度
  },
  onReady: function() {
    // 评论弹出层动画创建
    this.animation = wx.createAnimation({
     duration: 400, // 整个动画过程花费的时间，单位为毫秒
     timingFunction: "ease", // 动画的类型
     delay: 0 // 动画延迟参数
    })
    },

    showTalks: function(e) {
      const vm = this;
      const that = this;
      const _index = e.currentTarget.dataset.index; 
      let _msg = [...vm.data.video_list]; // msg的引用 
      console.log(_msg[_index]['img_name']) ;
    wx.navigateTo({
      url: '../../pages/browses/talks/talks?img_name='+_msg[_index]['img_name'],
    })
    
    },
  zan: function (e) {
    const vm = this;
    const that = this;
    const _index = e.currentTarget.dataset.index; 
    let _msg = [...vm.data.video_list]; // msg的引用 
    _msg[_index]['show1'] = !vm.data.video_list[_index]['show1'];
    console.log("点赞",_index)

    if(vm.data.video_list[_index]['show1'])
    {
      wx.showToast({
        title: '取消了一个赞',
        icon:'none',
        duration:1000
       })
       _msg[_index]['zannum'] = vm.data.video_list[_index]['zannum']-1;
       //云数据库赞-1
       wx.cloud.callFunction({
           name: 'zannum',// 云函数名称【刚刚创建的云函数文件的名字】
           data: {dishid:_msg[_index]['_id'],isadd:0},
           success: function (res) {
              {
                console.log(res.result)
                console.log('赞的del调用成功')
              }
            },
            fail: console.error
         })

         db.collection(getApp().globalData.useropenid).where({
          img_name:_msg[_index]['img_name']
         }).remove({
            success: function(res) {
              console.log('取消收藏 调用返回信息：',res)

            }
          })
    }
    else
    {
      wx.showToast({
        title: '点了一个赞',
        icon:'none',
        duration:1000
       })
       _msg[_index]['zannum'] = vm.data.video_list[_index]['zannum']+1;

       //云数据库赞+1 
       wx.cloud.callFunction({
          name: 'zannum',// 云函数名称【刚刚创建的云函数文件的名字】
          data: {dishid:_msg[_index]['_id'],isadd:1},
          success: function (res) {
            {
              console.log(res.result)
              console.log('赞的add调用成功')
            }
          },
          fail: console.error
        })

        db.collection(getApp().globalData.useropenid).add({
          // data 字段表示需新增的 JSON 数据
          data: {  
              show2:true,
              store:_msg[_index]['store'],
              talknum:_msg[_index]['talknum'],
              cainum:_msg[_index]['cainum'],
              img_name:_msg[_index]['img_name'],
              img_src:_msg[_index]['img_src'],
              img_tex2:_msg[_index]['img_tex2'],
              talks:_msg[_index]['talks'],
              zannum:_msg[_index]['zannum'],
              img_dislike:"../../images/menuicon/cai.png",
              img_like:"../../images/menuicon/xin1.png",
              img_tex1:_msg[_index]['tex1'],
              show1:true
          }
        }).then(res => {
          console.log('收藏成功,调用返回信息:',res)
        })

       if(!vm.data.video_list[_index]['show2'])//点赞后 如果有踩则取消踩 踩数量-1
       {
        _msg[_index]['show2'] = !vm.data.video_list[_index]['show2'];
        _msg[_index]['cainum'] = vm.data.video_list[_index]['cainum']-1;

        //云数据库踩-1 
        wx.cloud.callFunction({
          name: 'cainum',// 云函数名称【刚刚创建的云函数文件的名字】
          data: {dishid:_msg[_index]['_id'],isadd:0},
          success: function (res) {
            {
              console.log(res.result)
              console.log('踩的del调用成功')
            }
          },fail: console.error
        })

       }
    }
    vm.setData({
     video_list: _msg,
    })
   },
   
   cai: function (e) {
    const vm = this;
    const _index = e.currentTarget.dataset.index; 
    let _msg = [...vm.data.video_list]; // msg的引用 
    _msg[_index]['show2'] = !vm.data.video_list[_index]['show2'];
    if(vm.data.video_list[_index]['show2'])
    {
      wx.showToast({
        title: '取消了一个踩',
        icon:'none',
        duration:1000
       })
       _msg[_index]['cainum'] = vm.data.video_list[_index]['cainum']-1;

      //云数据库踩-1 
       wx.cloud.callFunction({
        name: 'cainum',// 云函数名称【刚刚创建的云函数文件的名字】
        data: {dishid:_msg[_index]['_id'],isadd:0},
        success: function (res) {
          {
            console.log(res.result)
            console.log('踩的del调用成功')
          }
        },
        fail: console.error
      })

    }
    else
    {
      wx.showToast({
        title: '踩踩踩',
        icon:'none',
        duration:1000
       })
       _msg[_index]['cainum'] = vm.data.video_list[_index]['cainum']+1;

       //云数据库踩+1 
       wx.cloud.callFunction({
        name: 'cainum',// 云函数名称【刚刚创建的云函数文件的名字】
        data: {dishid:_msg[_index]['_id'],isadd:1},
        success: function (res) {
          {
            console.log(res.result)
            console.log('踩的add调用成功')
          }
        },fail: console.error
      })
       
       if(!vm.data.video_list[_index]['show1'])
       {
        _msg[_index]['show1'] = !vm.data.video_list[_index]['show1'];
        _msg[_index]['zannum'] = vm.data.video_list[_index]['zannum']-1;

       //云数据库赞-1
        wx.cloud.callFunction({
          name: 'zannum',// 云函数名称【刚刚创建的云函数文件的名字】
          data: {dishid:_msg[_index]['_id'],isadd:0},
          success: function (res) {
            {
              console.log(res.result)
              console.log('赞的del调用成功')
            }
          },fail: console.error
        })

        db.collection(getApp().globalData.useropenid).where({
          img_name:_msg[_index]['img_name']
         }).remove({
            success: function(res) {
              console.log('从数据库移除收藏 调用信息：',res)

            }
          })
       }

    }
    vm.setData({
     video_list: _msg
    })
   },

jmp_go: function(e) {
  const vm = this;
  const that = this;
  const _index = e.currentTarget.dataset.index; 
  let _msg = [...vm.data.video_list]; // msg的引用 
  wx.showToast({
    title: '前往商家页面',
    icon:'none',
    duration:1000
   })
 wx.navigateTo({
   url: '/pages/shop/shop?Shop='+_msg[_index]['store']
 })

},
 
  // 用户点击显示弹窗
  clickPup: function() {
    let _that = this;
    if (!_that.data.click) {
      _that.setData({
        click: true,
      })
    }
 
    if (_that.data.option) {
      _that.setData({
        option: false,
      })
 
      // 关闭显示弹窗动画的内容，不设置的话会出现：点击任何地方都会出现弹窗，就不是指定位置点击出现弹窗了
      setTimeout(() => {
        _that.setData({
          click: false,
        })
      }, 500)
 
 
    } else {
      _that.setData({
        option: true
      })
    }
  },
 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        windowHeight:wx.getSystemInfoSync().windowHeight
      })
   db.collection('dish').aggregate().sample({
     size: 20
   }).end().then(res => {
    this.setData({
      video_list:res.list
      }
    )
    console.log('本次菜单列表：',res.list)
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


  touchStart(e){
    // 开始坐标
    this.setData({
     pageY:e.touches[0].pageY,
    })
   },
   // 划动过程坐标方法
   touchMove(e){
    let n = e.currentTarget.dataset.index;   // 触摸的第几个序号
    let difference = e.touches[0].pageY - this.data.pageY; // 移动后和起始值的差值
    if(this.is_continue(n,difference)){    // 判断是否到底
     return;
    } 
    // 划动动画 -------------------------------------
    var animation = wx.createAnimation({    // 移动动效
     duration: 0,
    });
    animation.top(difference - (n*this.data.windowHeight)).step()
    this.setData({
     animation: animation.export(),     // 动画
     up_stroke:difference > 0 ? false : true, // 是否上划,
     difference:difference,          // 拖动的距离
    })
   },
   // 划动结束坐标方法
   touchEnd(e){
    let n = e.currentTarget.dataset.index;
    let difference = this.data.difference; // 拖动的距离
    if(this.is_continue(n,difference)){
     return;
    }
    const windowHeight = this.data.windowHeight;   // 屏幕高度
    let that = this;
    // 根据id获取点击元素距顶部高度
    var query = wx.createSelectorQuery();
    let id = '#' + e.currentTarget.id;
    query.select(id).boundingClientRect(function (rect) { // 获取高度
     if(Math.abs(difference) <= windowHeight /7){   // 小于1/7回原位置 ---------------------------
      var animation = wx.createAnimation({ // 移动动效
       duration: 100,
      });
      animation.top(-(n * windowHeight)).step()
      that.setData({
       animation: animation.export(),
       up_stroke:false, // 重置划动状态
       difference:0,   // 重置划动距离
      })
     }else{ // 大于1/4，移至拖动的下一个视频 --------------------------------
      var animation = wx.createAnimation({ // 移动动效
       duration: 200,
      });
      that.data.up_stroke ? n++ : n--;   // 上划：n+1 下划：n-1
      animation.top(-(n * windowHeight)).step()
      that.setData({
       animation: animation.export(),
       up_stroke:false, // 重置划动状态
       difference:0,   // 重置划动距离
      })
     }
    }).exec();
   },
   // 判断是否到底
   is_continue(n,difference){
    if(difference < 0){ // 上划
     if(n == this.data.video_list.length - 1){ // 最后一个视频，提示到底
      if(difference < -20){
       wx.showToast({
        title: '已经到底了~~',
        icon:'none',
        duration:1000
       })
      }
      return true;
     }
    }else{
     if(n == 0){
      if(difference > 20){
       wx.showToast({
        title: '上面没有了~~',
        icon:'none',
        duration:1000
       })
      }
      return true;
     }
    }
   },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})