import React, { FC, memo } from 'react';
import { View } from '@tarojs/components';
import { Tabs } from '@nutui/nutui-react-taro';
import GoodsItem from '@/components/GoodsItem/GoodsItem';
import { homeGoodsList, homeGoodsTabList } from '@/mock/home-data';
import './HomeGoodsTab.scss';
import Taro from '@tarojs/taro';

// 商品 Tab 组件（适配 NutUI Tabs/Tabs.TabPane，保持原有功能）
const HomeGoodsTab: FC = () => {
  const navigateTo = () => {
    Taro.navigateTo({
      url: '/pages/group-buy-detail/index'
    });
  }
  return (
    <View className="home-goods-tab">
      <Tabs
        className="home-goods-tab__tabs"
        defaultValue="all"
      >
        {homeGoodsTabList.map((tab) => (
          <Tabs.TabPane key={tab.key} title={tab.title} value={tab.key} style={{ padding: 0 }}>
            {/* 商品列表 Flex 容器，逻辑不变 */}
            <View className="home-goods-tab__list">
              {homeGoodsList.map((item) => (
                <View key={item.id} className="home-goods-tab__item" onClick={navigateTo}>
                  <GoodsItem
                    imgUrl={item.imgUrl}
                    name={item.name}
                    price={item.price}
                    status={item.status}
                  />
                </View>
              ))}
            </View>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
};

export default memo(HomeGoodsTab);