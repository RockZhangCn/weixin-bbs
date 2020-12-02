// newtopic.js
var API = require('../../api.js')

const app = getApp()

Page({
  data: {
    userInfo: {},
    tabs: ['物品', '教育', '拼团', '求助', '其他'],
    tabValue: ['somthing', 'education', 'patch', 'help', 'other'],
    tabIndex: 0,
    tab: '',
    content: '',
    title: ''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: '发布主题'
    })
  },
  // 内容获取
  contentChange: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // 标题获取
  titleChange: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  // 分类名获取
  bindTabChange: function (e) {
    this.setData({
      tab: this.data.tabValue[e.detail.value],
      tabIndex: e.detail.value
    })
  },
  // 发布新的文章
  newTopic: function () {
    var title = this.data.title
    var content = this.data.content
    var openid = app.globalData.openid
    var tab = this.data.tab
    var that = this
    if (title == '' || content == '' || tab == '') {
      wx.showToast({
        title: '参数输入有误',
        icon: 'loading',
        duration: 1000
      })
    }
    wx.showLoading({
      title: '正在发布...'
    })

    wx.request({
      url: API.API.Post_topic,
      method: 'POST',
      data: {
        'title': title,
        'tab': tab,
        'content': content,
        'openid': openid
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.success) {
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000,
            complete: function () {
              //发布成功后跳转到文章详情
              wx.redirectTo({
                url: '/pages/detail/detail?id=' + res.data.topic_id
              })
            }
          })
        }else {
          wx.showToast({
            title: res.data.error_msg,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  }
})
