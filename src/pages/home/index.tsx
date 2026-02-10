import React, { FC, memo } from 'react';
import { View } from '@tarojs/components';
// 导入首页模块组件
import HomeSwipe from './components/HomeSwipe/HomeSwipe';
import HomeFunc from './components/HomeFunc/HomeFunc';
import HomeBanner from './components/HomeBanner/HomeBanner';
import HomeGoodsTab from './components/HomeGoodsTab/HomeGoodsTab';
import HomeScoreMall from './components/HomeScoreMall/HomeScoreMall';
import './index.scss'

// 首页主组件（memo 包裹优化性能）
const HomePage: FC = () => {
  return (
    <View className="home-page">
      <HomeSwipe />
      <HomeFunc />
      <HomeBanner />
      <HomeGoodsTab />
      <HomeScoreMall />
    </View>
  );
};

export default memo(HomePage);