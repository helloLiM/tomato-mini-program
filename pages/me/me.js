// pages/me/me.js
const {http} = require('../../lib/http.js')

Page({
  data: {
    tab:'tomato',
    tomatoes:{},
    todos:{}
  },
  changeTab(event){
    console.log(event.currentTarget.dataset.name)
    this.setData({ tab: event.currentTarget.dataset.name})
  },
  onShow(){
    http.get('/tomatoes',{is_group: "yes"})
      .then(response => {
        this.setData({ tomatoes: response.data.resources })
      })

    http.get('/todos', { is_group: "yes" })
      .then(response => {
        this.setData({ todos: response.data.resources })
      })
  
  }
 
  
})