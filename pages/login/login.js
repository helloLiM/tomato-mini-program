const { http } = require('../../lib/http.js')
const { app_id, app_secret } = getApp().globalData

Page({
  data: {

  },
  onShow(){
    // console.log(http)
  },
  //点击按钮 => 调用小程序原生的 wx.login => 参数 => http.post => 返回 user
  // => 保存user => 返回首页
  login(event) {
    console.log(event)
    let encrypted_data = event.detail.encryptedData
    let iv = event.detail.iv
    let code
    wx.login({
      success(res){
        console.log(res)
        code = res.code
        http.post('/sign_in/mini_program_user',{
          code,
          iv,
          encrypted_data,
          app_id,
          app_secret,
        })
        .then(response => {
          wx.setStorageSync('me', response.data.resource)
          wx.setStorageSync('X-token', response.header["X-token"])
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }
        )
      }
    })

  },
  // wxLogin(encrypted_data, iv) {
  //   wx.login({
  //     success: (res) => this.loginMe(res.code, iv, encrypted_data)
  //   })
  // },
  // loginMe(code, iv, encrypted_data) {
  //   http.post('/sign_in/mini_program_user', {
  //     code,
  //     iv,
  //     encrypted_data,
  //     app_id,
  //     app_secret,
  //   })
  //     .then(response => {
  //       this.saveMessage(response)
  //       wx.reLaunch({ url: "/pages/home/home" })
  //     })
  // },
  // saveMessage(response) {
  //   wx.setStorageSync('me', response.data.resource)
  //   wx.setStorageSync('X-token', response.header["X-token"])
  // }
})