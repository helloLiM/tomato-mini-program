
Page({
  data: {
    account: "",
    password_digest: "",
    isbind:true
  },
  watchAccount(event) {
    this.setData({ account: event.detail.value })
  },
  watchPassword(event) {
    this.setData({ password_digest: event.detail.value })
  },
  // gotobinding(event){
  //   this.setData({ isbind: true})
  // },
  gotosignup(event){
    console.log(event)
    this.setData({ isbind: false })
  },
  submit(){
    http.post('/bindings', {
      account: this.data.account,
      password_digest: this.data.password_digest
    })
      .then(response => {
        wx.setStorageSync('me', response.data.resource)
        wx.reLaunch({ url: "/pages/home/home" })
      })
  },
})