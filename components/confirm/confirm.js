Component({
  properties: {  
    placeholder: {
      type: String,
      value: ""
    },
    visible: {
      type:Boolean,
      value:"false"
    }
  },
  methods: {
    confirm(){
      this.triggerEvent('confirm', this.data.calue)
      this.triggerEvent('cancel', '取消')
      //定义一个函数，子组件向外发送数据，类似于vue中的$emit，在home中监听，数据发送给了home.js中的confirm函数，此函数接受了'123123123'数据
    }, 
    cancel(){
      this.triggerEvent('cancel','取消')
    },
    watchValue(value){//监听input框输入的值***注意要传入值才行
      // console.log(value)
      this.data.calue = value.detail.value//这一步很关键，取得所需要的值之后，再将数字传出去给confirm接收使用 
    }
  }
})