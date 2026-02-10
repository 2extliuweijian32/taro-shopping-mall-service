export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/car-plate-input/index',
    'pages/self-integration/index',
    'pages/points-detail/index',
    'pages/coupon-bag/index',
    'pages/coupon-detail/index',
    'pages/group-buy-detail/index',
    'pages/group-buy-list/index',
    'pages/confirm-order/index',
    'pages/gift-detail/index',
    'pages/gift-confirm-order/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'ASCF',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: './assets/tabs/home.png',
        selectedIconPath: './assets/tabs/home_active.png',
      },
      // {
      //   pagePath: 'pages/category/index',
      //   text: '分类',
      //   iconPath: './assets/tabs/category.png',
      //   selectedIconPath: './assets/tabs/category_active.png',
      // },
      // {
      //   pagePath: 'pages/cart/index',
      //   text: '购物车',
      //   iconPath: './assets/tabs/cart.png',
      //   selectedIconPath: './assets/tabs/cart_active.png',
      // },
      // {
      //   pagePath: 'pages/user/userInfo/index',
      //   text: '我的',
      //   iconPath: './assets/tabs/user.png',
      //   selectedIconPath: './assets/tabs/user_active.png',
      // },
    ],
    color: '#999',
    selectedColor: '#e80e27',
    backgroundColor: '#fff',
    borderStyle: 'black',
  },
})
