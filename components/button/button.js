Component({  
  properties:{  //定义组件接受外部传入的变量，在vue中是Prop
    size: {
      type:String,
      value:""
    },
    text: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: "default"
    }
  }
})