const { http } = require("../../lib/http.js")
Page({
  data: {
    time:5,
    defaultTime:5,//要先设置一个默认时间以用来计数，然后将技术后的时间赋予给time来显示，否则直接用time来计算会导致NaN错误
    // timer:null,
    timeStatus:'start',
    confirmVisible:false,
    abandonVisible:false,
    accomplishVisible:false,
    tomato:{}
  },
  onShow: function(){
   this.timepiece()
   http.post('/tomatoes').then(response => {
     this.setData({tomato: response.data.resource})
     this.methods()
   })
  },
  methods(){
    console.log(123)
    console.log(this.data.tomato.id)
  },
  timepiece(){
    this.setData({ timeStatus: 'start' })//如果 start和stop弄反了的话，会导致timepiece被重复调用，时间加快
    this.changeTime()
    this.timer = setInterval(()=>{
      if(this.data.defaultTime===0){ 
        this.setData({ accomplishVisible: true }) //当时间为0时，跳出你完成了什么输入框
        this.setData({ abandonVisible:true})  //当时间为0时，显示再来一组按钮    
        // this.data.time = 0
        return 
      }
      this.data.defaultTime = this.data.defaultTime - 1 
      this.changeTime()
      console.log(this.data.defaultTime)
    },1000)
  },
  finishedConfirm() {//当点击完成框取消按钮时发生什么
    this.setData({ accomplishVisible: false })
    clearInterval(this.timer)
  },
  confirmFinished(event) {//当点击完成框确定按钮时发生什么
    this.setData({ accomplishVisible: false })
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: content,
      aborted: false
    })
    console.log(event.detail)
  },
  againTimer(){//再来一组
    this.data.defaultTime = 15
    this.timepiece()
    this.setData({ abandonVisible: false })
  },

  clearTimer(){//暂停时间计数
    clearInterval(this.timer)
    // this.timer = null
    this.setData({timeStatus: 'stop'})
  },
  changeTime(){//改变时间格式
    let m = Math.floor(this.data.defaultTime/60)
    let s = Math.floor(this.data.defaultTime%60)
    if(s === 0){
      s = "00"
    }
    if((s+"").length === 1){
      s = "0"+s
    }
    if((m+"").length === 1){
      m = "0"+m
    }
    // console.log(m + ':' + s)
    this.setData({ time: m + ':' + s })
    // return m+':'+s
  },
  
  showConfirm() {//点击放弃按钮弹出放弃框
    clearInterval(this.timer)
    this.setData({ confirmVisible: true })
  },
  cancelConfirm(){
    this.onShow()
    this.setData({ confirmVisible: false })//在这里有一个小问题，如果data中的confirmVisible不使用""号包裹，那么这里的false使用了""包裹则会出现问题，但是上面的true使用""包裹则没有问题。。。第二种办法就是data中的confirmVisible使用""号包裹，但是里面不写任何值
  },
  confirmAbandon(event){//放弃框点击确定后的事件
    let content = event.detail
    http.put(`/tomatoes/${this.data.tomato.id}`,{
      description: content,
      aborted: true
    })
    console.log(content)
    wx.navigateBack({
      delta: -1,
    })
    // console.log(event.detail)
  },
  onHide() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  },
  onUnload() {
    this.clearTimer()
    http.put(`/tomatoes/${this.data.tomato.id}`, {
      description: "退出放弃",
      aborted: true
    })
  }, 
})