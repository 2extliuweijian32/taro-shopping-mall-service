import React, { FC, memo } from 'react';
import { View, Text } from '@tarojs/components';
import GoodsItem from '@/components/GoodsItem/GoodsItem';
import { homeScoreGoodsList } from '@/mock/home-data';
import Taro from '@tarojs/taro';
import './HomeScoreMall.scss';

// 积分商城组件（移除 NutUI Flex 依赖）
const HomeScoreMall: FC = () => {
  const navigateTo = () => {
    Taro.navigateTo({
      url: '/pages/gift-detail/index'
    });
  }
  return (
    <View className="home-score-mall">
      <Text className="home-score-mall__title">积分商城</Text>
      {/* 外层 View 作为 Flex 容器 */}
      <View className="home-score-mall__list">
        {homeScoreGoodsList.map((item) => (
          <View key={item.id} className="home-score-mall__item" onClick={navigateTo}>
            <GoodsItem
              imgUrl={item.imgUrl}
              name={item.name}
              score={item.score}
              status={item.status}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(HomeScoreMall);