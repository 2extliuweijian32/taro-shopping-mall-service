import React, { FC, memo } from 'react';
import { View, Image } from '@tarojs/components';
import { homeBannerData } from '@/mock/home-data';
import './HomeBanner.scss';

// Banner 广告组件（memo 包裹优化性能）
const HomeBanner: FC = () => {
  return (
    <View className="home-banner">
      <Image
        src={homeBannerData.imgUrl}
        className="home-banner__img"
        mode="aspectFill"
      />
    </View>
  );
};

export default memo(HomeBanner);