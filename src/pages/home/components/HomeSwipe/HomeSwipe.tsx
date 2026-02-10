import React, { FC, memo } from 'react';
import { View, Image } from '@tarojs/components';
import { Swiper, pxTransform } from '@nutui/nutui-react-taro';
import { homeSwipeList } from '@/mock/home-data';
import './HomeSwipe.scss';

// 轮播图组件（memo 包裹优化性能）
const HomeSwipe: FC = () => {
  return (
    <View className="home-swipe">
      <Swiper
        autoplay
        indicator
        width="100%"
        height="100%"
        className="home-swipe__container"
      >
        {homeSwipeList.map((item) => (
          <Swiper.Item key={item.id}>
            <Image
              src={item.imgUrl}
              className="home-swipe__img"
              mode="aspectFill"
            />
          </Swiper.Item>
        ))}
      </Swiper>
    </View>
  );
};

export default memo(HomeSwipe);