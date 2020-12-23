
const db = wx.cloud.database();//初始化数据库
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
      imgsrctest:"../../images/upimg/update.png",
      foodname:"",
      inputvaule:"",
      imgData: [],
      details:"",
      maxNumber:15,//可输入最大字数
      number: 0,//已输入字数
      chosen: '',
      imgs: [],
      //当前选中数组的下标值proCityArr: [], //2列选择器当前要显示的数据
      proObjArr: [{id: 1, name: '玫瑰园'}, {id: 2, name: '玫瑰二楼(禾丰元)'}, {id: 3, name: '紫荆园'},{id: 4, name: '紫荆二楼'},{id: 5, name: '海棠园(京元)'},{id: 6, name: '朝阳园'},{id: 7, name: '丁香园'},{id: 8, name: '丁香二楼'}], //接口获取的数据
      cityObjArr: [ //接口获取的数据。
        {parentId: 1, id: 1 , name:'觅糖' },
        {parentId: 1, id: 2 , name:'吖先知' },
        {parentId: 1, id: 3 , name:'水果捞' },
        {parentId: 1, id: 4 , name:'食惠简餐' },
        {parentId: 1, id: 5 , name:'糖水粥' },
        {parentId: 1, id: 6 , name:'咖喱饭' },
        {parentId: 1, id: 7 , name:'手工水饺' },
        {parentId: 1, id: 8 , name:'馅饼' },
        {parentId: 1, id: 9 , name:'面夫子' },
        {parentId: 1, id: 10 , name:'蜜雪冰城' },
        {parentId: 1, id: 11 , name:'超记铁板烧' },
        {parentId: 1, id: 12 , name:'猫叫了只鱼' },
        {parentId: 1, id: 13 , name:'十二稻' },
        {parentId: 1, id: 14 , name:'瓦罐' },
        {parentId: 1, id: 15 , name:'烧腊简餐' },
        {parentId: 1, id: 16 , name:'北京麻辣烫' },
        {parentId: 1, id: 17 , name:'沙县小吃' },
        {parentId: 1, id: 18 , name:'兰州拉面' },
        {parentId: 1, id: 19 , name:'锡纸烤' },
        {parentId: 1, id: 20 , name:'嘿米牛肉饭' },
        {parentId: 1, id: 21 , name:'猪脚饭' },
        {parentId: 1, id: 22 , name:'豪客士' },
        
        {parentId: 2, id: 1 , name:'99自助餐' },
        {parentId: 2, id: 2 , name:'壹米阳光' },
        {parentId: 2, id: 3 , name:'六号简餐' },
        {parentId: 2, id: 4 , name:'酷乐普斯蛋包饭' },
        {parentId: 2, id: 5 , name:'担仔面' },
        {parentId: 2, id: 6 , name:'墨西哥特色烤肉' },
        {parentId: 2, id: 7 , name:'老鱼炒饭' },
        {parentId: 2, id: 8 , name:'鱼谷稻烤鱼饭' },
        {parentId: 2, id: 9 , name:'大味小煲' },
        {parentId: 2, id: 10 , name:'川蜀季' },
        {parentId: 2, id: 11 , name:'百味园' },
        {parentId: 2, id: 12 , name:'遵义羊肉粉' },
        {parentId: 2, id: 13 , name:'兰州拉面' },
        {parentId: 2, id: 14 , name:'好妈烫饭' },
        {parentId: 2, id: 15 , name:'爱米渔渔粉' },
        {parentId: 2, id: 16 , name:'小米米大碗饭' },
        {parentId: 2, id: 17 , name:'天天卤味' },
        {parentId: 2, id: 18 , name:'小明烧菜' },
        {parentId: 2, id: 19 , name:'麦德豪' },
        {parentId: 2, id: 20 , name:'水果捞' },
                
        {parentId: 3, id: 1 , name:'自选快餐' },
        {parentId: 3, id: 2 , name:'风味早点' },
        
        {parentId: 4, id: 1 , name:'特色煲仔' },
        {parentId: 4, id: 2 , name:'食汇水煮' },
        {parentId: 4, id: 3 , name:'手工水饺' },
        {parentId: 4, id: 4 , name:'乡村炖品' },
        {parentId: 4, id: 5 , name:'饸饹面' },
        {parentId: 4, id: 6 , name:'沙茶面' },
        {parentId: 4, id: 7 , name:'漳州风味' },
        {parentId: 4, id: 8 , name:'闽北特色' },
        {parentId: 4, id: 9 , name:'新加坡捞烫' },
                
        {parentId: 5, id: 1 , name:'喔喔手工水饺' },
        {parentId: 5, id: 2 , name:'麻辣香锅' },
        {parentId: 5, id: 3 , name:'淳百味' },
        {parentId: 5, id: 4 , name:'瓦香鸡米饭' },
        {parentId: 5, id: 5 , name:'猫叫了只鱼' },
        {parentId: 5, id: 6 , name:'港式烧腊' },
        {parentId: 5, id: 7 , name:'饭小榜牛肉饭' },
        {parentId: 5, id: 8 , name:'品鲜高汤' },
        {parentId: 5, id: 9 , name:'老鸭粉面' },
        {parentId: 5, id: 10 , name:'李大碗拉面' },
        {parentId: 5, id: 11 , name:'廖记瓦罐' },
        {parentId: 5, id: 12 , name:'章叔有空' },
        {parentId: 5, id: 13 , name:'正粤营养糖水粥' },
                
        {parentId: 6, id: 1 , name:'阿肥发扁食' },
        {parentId: 6, id: 2 , name:'阿妈香肉拌饭' },
        {parentId: 6, id: 3 , name:'阿兴瓦罐' },
        {parentId: 6, id: 4 , name:'典赞花甲粉' },
        {parentId: 6, id: 5 , name:'广式煲仔砂锅' },
        {parentId: 6, id: 6 , name:'麻辣香锅' },
        {parentId: 6, id: 7 , name:'蜀合记' },
        {parentId: 6, id: 8 , name:'无骨烤鱼饭' },
        {parentId: 6, id: 9 , name:'杨守荣麻辣烫' },
        {parentId: 6, id: 10 , name:'旋转小火锅' },
        {parentId: 6, id: 11 , name:'壹碗米饭' },
        {parentId: 6, id: 12 , name:'自选快餐' },
        
        {parentId: 7, id: 1 , name:'营养快餐' },
        {parentId: 7, id: 2 , name:'功夫粥' },
        {parentId: 7, id: 3 , name:'腊么香' },
        {parentId: 7, id: 4 , name:'新概念瓦罐' },
        {parentId: 7, id: 5 , name:'沙县小吃' },
        {parentId: 7, id: 6 , name:'小米米' },
        {parentId: 7, id: 7 , name:'民族餐厅' },
        {parentId: 7, id: 8 , name:'锅先生渔粉' },
        {parentId: 7, id: 9 , name:'沙茶面' },
        {parentId: 7, id: 10 , name:'水果捞' },
        {parentId: 7, id: 11 , name:'鑫龙福麻辣烫' },
        {parentId: 7, id: 12 , name:'兰州拉面' },
        {parentId: 7, id: 13 , name:'胖子' },
                
        {parentId: 8, id: 1 , name:'迪卡健身餐厅' },
        {parentId: 8, id: 2 , name:'肉骨茶' },
        {parentId: 8, id: 3 , name:'范青春焖饭' },
        {parentId: 8, id: 4 , name:'小猪麻辣烫' },
        {parentId: 8, id: 5 , name:'沙茶面' },
        {parentId: 8, id: 6 , name:'金翼瓦罐' },
        {parentId: 8, id: 7 , name:'石锅鱼' },
        {parentId: 8, id: 8 , name:'重庆小面' },
        {parentId: 8, id: 9 , name:'一品草膳汤' },
        {parentId: 8, id: 10 , name:'老上海混沌' },
        {parentId: 8, id: 11 , name:'脆皮鸡米饭' },
        {parentId: 8, id: 12 , name:'闽香卤味' },  
        {parentId: 8, id: 13 , name:'谷田稻乡' },
        
        
      ],
      proCityIndex: [0, 0], //2列选择器当前显示数据的索引
  
  },

  onLoad: function(){
      let proArr = [];
      let cityArr = [];
      for(var i=0; i<this.data.proObjArr.length; i++){
        proArr.push(this.data.proObjArr[i].name)
      }
      for(var i=0; i<this.data.cityObjArr.length; i++){
        if(this.data.cityObjArr[i].parentId == 1){
          cityArr.push(this.data.cityObjArr[i].name)
        }
      }
      this.setData({ //根据接口的数据，给当前显示的默认数据
        [`proCityArr[0]`]: proArr,
        [`proCityArr[1]`]: cityArr,
      })  
  },

    formSubmit(e) {
      if(
        this.data.imgsrctest!="../../images/upimg/update.png"&&
        this.data.proCityArr[1][this.data.proCityIndex[1]]!=''&&  //判定数据不得为空
        this.data.inputvaule!=''&&
        this.data.details!=''
        )
      {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      console.log('form发生了submit事件，食堂序号为：', e.detail.value.picker[0])
      console.log('form发生了submit事件，店名为：',this.data.proCityArr[1][this.data.proCityIndex[1]])
      console.log('form发生了submit事件，提交数据：菜名：',this.data.inputvaule,"介绍:",this.data.details)
      console.log('form发生了submit事件，提交图片为：',this.data.imgsrctest[0])
      this.setData({
        chosen: e.detail.value
      })

      var that=this
      wx.cloud.uploadFile({
        cloudPath: 'images/userupload/'+getApp().globalData.useropenid+'/'+that.data.proCityArr[1][that.data.proCityIndex[1]]+((e.detail.value.picker[0]+1))+that.data.inputvaule+'.png',
        filePath: this.data.imgsrctest[0], // 文件路径
        success: res => {
          console.log('图片上传到云存储成功，上传图片路径：',res.fileID)
          db.collection('userupload').add({
            data: {  
                show2:true,
                store:that.data.proCityArr[1][that.data.proCityIndex[1]],
                canteennum:e.detail.value.picker[0]+1,
                talknum:0,
                cainum:0,
                isaudit:false,
                img_name:that.data.inputvaule,
                img_src: 'https://7375-sutest2020-ukd9i-1304294060.tcb.qcloud.la/images/userupload/'+getApp().globalData.useropenid+'/'+that.data.proCityArr[1][that.data.proCityIndex[1]]+((e.detail.value.picker[0]+1))+that.data.inputvaule+'.png',
                img_tex2:that.data.details,
                talks:[],
                zannum:0,
                img_dislike:"../../images/menuicon/cai.png",
                img_like:"../../images/menuicon/xin1.png",
                img_tex1:that.data.inputvaule,
                show1:true
            },
            success:function(res) 
            {
              console.log('上传到userupload成功，云端返回信息:',res)
            },fail: console.error
          })
        },
        fail: err => {
          console.log(err)
          console.log(cloudPath)
        }
      })
      wx.showToast({
        title: '提交中',
        icon: 'loading',
        duration: 2000,
        success:function(){ 
          setTimeout(function () { 
              wx.showToast({
              title: '感谢您为饭图添砖加瓦',
              icon: 'none',
              duration: 1500,
            })
            setTimeout(function (){
              wx.switchTab({
                url: '../homepage/homepage'
              })},1000)   
            }
           ,2000) 
       }
      })
      }else{
        wx.showToast({
          title: "抱歉 请勿留空数据",
          icon: 'none',
          duration: 1000,
        })
      }
      


    },

    formReset(e) {
      console.log('form发生了reset事件，携带数据为：', e.detail.value)
      this.setData({
        inputvaule:'',
        details:''
      })
    },

    // 城市选择后确定--触发
    proCityChange: function(e){
      let proCityIndex = e.detail.value
      this.setData({
        proCityIndex: proCityIndex
      })
      console.log(this.data.proCityArr[0][proCityIndex[0]],
                  this.data.proCityArr[1][proCityIndex[1]],);
    },


    // 城市选择时--触发
    proCityColumnChange: function(e){
      let column = e.detail.column;//第几列被触发
      let index = e.detail.value;//变成第几个
      let proCityIndex = this.data.proCityIndex;

        if(column===0){//第一列选中项数据被滑动修改了...
          proCityIndex[0] = index;
          proCityIndex[1] = 0;//第一列修改了，第二列始终显示第一个
          let currentParentId = this.data.proObjArr[index].id;
          let cityArr = [];
          for(var i=0; i<this.data.cityObjArr.length; i++){
            if(this.data.cityObjArr[i].parentId == currentParentId){
              cityArr.push(this.data.cityObjArr[i].name)
            }
          }
          this.setData({
            [`proCityArr[1]`]: cityArr, //当前显示数据的重新赋值
            [`proCityIndex`]: proCityIndex //当前显示数据的索引的重新赋值
          })
      }else{//第二列选中项数据被滑动修改了...
          proCityIndex[1] = index;
          this.setData({
            [`proCityIndex`]: proCityIndex //当前显示数据的索引的重新赋值
          })
      }
    },
  
    getfoodname(event) { //监听获取菜名
      var _this=this;
      console.log("菜名:", event.detail.value)
      this.setData({
        inputvaule: event.detail.value
      })
    },
    
    uploadPhoto(e) { // 拍摄或从相册选取上传
      let that = this;
      var tempFilePaths
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success(res) {
          tempFilePaths = res.tempFilePaths; // 返回选定照片的本地路径列表 
          //that.upload(that, tempFilePaths);
        // console.log(tempFilePaths);
        that.setData({
          imgsrctest:tempFilePaths
        })
        }
      })
      console.log(tempFilePaths)
    },

    previewImg: function (e) {
      //获取当前图片的下标
      var imgs = this.data.imgsrctest;
      wx.previewImage({
        //当前显示图片
        //current: imgs[index],
        //所有图片
        urls: imgs
      })
    },

    bindTextAreaBlur: function(e) {
      console.log("菜的相关介绍：",e.detail.value);
      var that = this;
      that.setData({
        details: e.detail.value
      });
      let value = e.detail.value;//获取textarea的内容，
      let len = value.length;//获取textarea的内容长度
      this.setData({
        'number': len
      })
    },


  })