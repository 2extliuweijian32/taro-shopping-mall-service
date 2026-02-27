// src/mock/homeData.ts
import { GoodsStatus } from '@/components/GoodsItem/GoodsItem';

// 1. 轮播图数据
export const homeSwipeList = [
  { id: '1', imgUrl: 'https://placeholder.pics/svg/750x562/FF6B6B/FFFFFF/轮播图1' },
  { id: '2', imgUrl: 'https://placeholder.pics/svg/750x562/4ECDC4/FFFFFF/轮播图2' },
  { id: '3', imgUrl: 'https://placeholder.pics/svg/750x562/45B7D1/FFFFFF/轮播图3' }
];

// 2. 功能入口数据（更新：用 iconImgUrl 替代 iconType，提供 mock 图片）
export const homeFuncList = [
  { 
    id: '1', 
    title: '停车缴费',
    route: '/pages/car-plate-input/index',
    iconImgUrl: 'https://placeholder.pics/svg/40x40/FF6B6B/FFFFFF/车' // 适配图标容器，40x40 避免溢出
  },
  { 
    id: '2', 
    title: '拍照积分', 
    route: '/pages/self-integration/index',
    iconImgUrl: 'https://placeholder.pics/svg/40x40/4ECDC4/FFFFFF/相机' 
  },
  { 
    id: '3', 
    title: '我的券包', 
    route: '/pages/coupon-bag/index',
    iconImgUrl: 'https://placeholder.pics/svg/40x40/45B7D1/FFFFFF/券' 
  },
  { 
    id: '4', 
    title: '超值团购', 
    route: '/pages/group-buy-list/index',
    iconImgUrl: 'https://placeholder.pics/svg/40x40/9B59B6/FFFFFF/团' 
  },
  { 
    id: '5', 
    title: '加入社群', 
    iconImgUrl: 'https://placeholder.pics/svg/40x40/1ABC9C/FFFFFF/群' 
  }
];

// 3. 商品 Tab 数据
export const homeGoodsList = [
  { 
    id: '1', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品1', 
    name: '商场专属定制保温杯 304不锈钢大容量便携车载水杯', 
    price: 99.9, 
    status: GoodsStatus.NORMAL 
  },
  { 
    id: '2', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品2', 
    name: '网红爆款零食大礼包 休闲食品组合装 送女友送闺蜜', 
    price: 129.0, 
    status: GoodsStatus.SOLD_OUT 
  },
  { 
    id: '3', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品3', 
    name: '夏季新款纯棉T恤 宽松百搭显瘦圆领短袖上衣', 
    price: 59.9, 
    status: GoodsStatus.SEC_KILL 
  },
  { 
    id: '4', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品4', 
    name: '家用多功能料理机 榨汁搅拌研磨一体 小型便捷', 
    price: 299.0, 
    status: GoodsStatus.OFF_SHELF 
  },
  { 
    id: '5', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品5', 
    name: '便携充电宝 20000mAh 双向快充 小巧轻薄兼容所有机型', 
    price: 149.0, 
    status: GoodsStatus.NORMAL 
  },
  { 
    id: '6', 
    imgUrl: 'https://placeholder.pics/svg/300x300/F5F5F5/333333/商品6', 
    name: '品牌太阳镜 防紫外线强光 时尚大框显脸小 男女同款', 
    price: 269.0, 
    status: GoodsStatus.SEC_KILL 
  }
];

// 4. 积分商城数据
export const homeScoreGoodsList = [
  { 
    id: '1', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品1', 
    name: '积分兑换 精美马克杯 带盖勺陶瓷水杯', 
    score: 500, 
    status: GoodsStatus.NORMAL 
  },
  { 
    id: '2', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品2', 
    name: '积分兑换 便携购物袋 环保可折叠大容量', 
    score: 200, 
    status: GoodsStatus.SOLD_OUT 
  },
  { 
    id: '3', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品3', 
    name: '积分兑换 品牌纸巾 整箱家庭装 柔软亲肤', 
    score: 800, 
    status: GoodsStatus.SEC_KILL 
  },
  { 
    id: '4', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品4', 
    name: '积分兑换 手机支架 桌面懒人支架 可调节角度', 
    score: 300, 
    status: GoodsStatus.OFF_SHELF 
  },
  { 
    id: '5', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品5', 
    name: '积分兑换 卡通钥匙扣 可爱立体挂件 防丢耐磨', 
    score: 150, 
    status: GoodsStatus.NORMAL 
  },
  { 
    id: '6', 
    imgUrl: 'https://placeholder.pics/svg/300x300/E6F7FF/333333/积分商品6', 
    name: '积分兑换 迷你笔记本 便携随身记事本 加厚纸张', 
    score: 250, 
    status: GoodsStatus.SOLD_OUT 
  }
];

// 5. 商品 Tab 配置
export const homeGoodsTabList = [
  { title: '全部', key: 'all' },
  { title: '秒杀', key: 'seckill' },
  { title: '团购', key: 'group' },
  { title: '拼团', key: 'joint' }
];

// 6. Banner 广告数据
export const homeBannerData = {
  imgUrl: 'https://placeholder.pics/svg/710x250/FFEBEB/E64340/商场专属优惠 Banner',
  alt: '商场广告'
};