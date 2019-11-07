const {http} = require("../../lib/http.js")
Page({
  data: {
    lists:[],
    confirmVisible:false,
    animationData:{}
  },
  onShow(){
    http.get('/todos?completed=false')
    .then(response=>{
      this.setData({ lists: response.data.resources})//获取数据的方式不能错
    })
  },
  // onLoad(){
  //   console.log(this.data.lists.filter(item => item.finished))
  // },
  confirmCreate(event){//t-confirm调用的方法，这个函数接受了从confirm中传过来的数据(bindconfirm绑定了comfirm组件，并=comfirmCreate)
    let content = event.detail
    console.log(content)
    if (content) {//如果传入了数据执行
      http.post('/todos',{
          completed: false,
          description: content
        
      })
      .then(response => {
        let todo = [response.data.resource]
        console.log(todo)
        this.data.lists = todo.concat(this.data.lists)
        this.setData({ lists: this.data.lists })
        this.cancel()
      })
    }
  },//以上代码为创建任务
  cancel(event){
    this.setData({confirmVisible:false})//当监听到confirm组件中的取消事件时，将visible设置为false
  },
  showCreateConfirm(){//当点击创建任务时，触发事件，弹出confirm组件
    this.setData({
      confirmVisible: true
    })
  },
  destoryTodo(event){
    console.log(event)
    let index = event.currentTarget.dataset.index
    let id = event.currentTarget.dataset.id
    http.put(`/todos/${id}`,{
      completed: true
    })
    .then(response => {
      let todo = response.data.resource
      this.data.lists[index].completed = true
      this.setData({ lists: this.data.lists })
    })
  }//以上代码为，点击列表，左侧小圆点亮、
  
})