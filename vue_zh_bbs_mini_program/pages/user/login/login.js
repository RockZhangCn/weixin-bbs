// login.js
var API = require('../../api.js')

const app = getApp()

Page({
  data: {
    userInfo: {},
    inputValue: '',
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function () {
    console.log("where are you onload?")
      wx.setNavigationBarTitle({
        title: '登陆'
      })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("else if this.datawx.canIUse('schema')")
      app.userInfoReadyCallback = res => {
        console.log("Ready call back.")
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.log("else if this.dat")
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  //二维码
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: (res) => {
        if (res.result) {
          that.login(res.result)
        }
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //accesstoken
  accessLogin: function () {
  //   if (this.data.inputValue != '') {
  //     this.login(this.data.inputValue)
  //   }else {
  //     wx.showToast({
  //       title: 'accesstoken值不能为空',
  //       icon: 'loading',
  //       duration: 1000
  //     })
  //   }
  console.log("Code login is clicked.")
  wx.login({
    timeout: 80000,
    success: function (r) {
      var code = r.code;//登录凭证
      console.log("Code is ", code)
      if (code) {
          //2、发送登录凭证以获取OpenID
          wx.request({
            url: 'https://rockzhang.com/login/', //自己服务登录地址
            method: 'post',
            header: {'content-type': 'application/json'},
            data: {code: code},
            success: function (data) {
                          console.log('获取用户OpenID成功', data);
                      },
            fail: function () {
                        console.log('获取用户OpenID失败');
            }                  
          })
      } else {
          console.log('获取用户登录态失败！' + r.errMsg)
      }
    },
    fail: function () {
        callback(false)
    }
  })
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  //accesstoken验证登陆
  login: function (token) {
    wx.showLoading({
      title: '正在登陆...'
    })
    wx.request({
      url: API.API.Post_access,
      method: 'POST',
      data: {
        'accesstoken': token
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.success) {
          //设置本地缓存信息
          wx.setStorageSync('accesstoken', token)
          wx.setStorageSync('loginname', res.data.loginname)
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 2000,
            complete: function () {
              wx.redirectTo({
                url: '/pages/user/user/user'
              })
            }
          })
        }
      }
    })
  }
})
