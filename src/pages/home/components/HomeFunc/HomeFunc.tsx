import React, { FC, memo } from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { homeFuncList } from '@/mock/home-data';
import './HomeFunc.scss';

// 功能入口组件（用 mock 图片替代 NutUI 图标，移除无用依赖）
const HomeFunc: FC = () => {
  const handleRedirect = (url?: string) => {
    if (!url) {
      return;
    }
    Taro.navigateTo({
      url,
    }).catch(err => {
      console.error('跳转失败：', err);
    });
  };

  return (
    <View className="home-func">
      {/* 外层 View 作为 Flex 容器 */}
      <View className="home-func__list">
        {homeFuncList.map((item) => (
          <View key={item.id} className="home-func__item" onClick={() => handleRedirect(item.route)}>
            {/* 用 Image 组件渲染 mock 图标图片，替代原有图标组件 */}
            <View className="home-func__icon">
              <Image
                src={item.iconImgUrl}
                className="home-func__icon-img"
                mode="aspectFit" // 保持图片比例，完整显示在容器内
              />
            </View>
            <Text className="home-func__text">{item.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(HomeFunc);