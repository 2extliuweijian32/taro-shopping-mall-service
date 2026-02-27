// src/pages/groupBuyList/index.tsx
import React, { FC, memo, useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { groupBuyList } from '@/mock/group-buy-list';
import './index.scss';
import Taro from '@tarojs/taro';

const tabConfig = [
  { key: "all", label: "全部" },
  { key: "seckill", label: "秒杀" },
  { key: "group", label: "团购" },
  { key: "spell", label: "拼团" }
];

const GroupBuyList: FC = () => {
  // 激活的Tab key（参与渲染）
  const [activeTabKey, setActiveTabKey] = useState("all");
  // 刷新状态（按Tab独立控制，参与渲染）
  const [refreshing, setRefreshing] = useState<Record<string, boolean>>({
    all: false,
    seckill: false,
    group: false,
    spell: false
  });
  // 当前列表数据（参与渲染）
  const [listData, setListData] = useState<any[]>(groupBuyList[activeTabKey as keyof typeof groupBuyList]);
  
  // 统一存储不参与渲染的辅助数据：scrollTop + refreshTriggered
  const helperRef = useRef({
    scrollTop: 0,        // 滚动位置
    refreshTriggered: false // 是否触发过刷新
  });
  // 滚动容器Ref
  const scrollRef = useRef<{ node: HTMLElement | null }>({ node: null });

  // 切换Tab时重置数据和辅助状态
  useEffect(() => {
    setListData(groupBuyList[activeTabKey as keyof typeof groupBuyList]);
    setRefreshing(prev => ({ ...prev, [activeTabKey]: false }));
    // 重置helperRef中的状态
    helperRef.current = {
      scrollTop: 0,
      refreshTriggered: false
    };
  }, [activeTabKey]);

  // 切换Tab
  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  // 模拟刷新数据（重置+打乱顺序，模拟新数据）
  const mockRefreshData = (tabKey: string) => {
    const originData = groupBuyList[tabKey as keyof typeof groupBuyList];
    const newData = [...originData].sort(() => Math.random() - 0.5);
    setListData(newData);
  };

  // 监听滚动事件：向下滚动刷新
  const handleScroll = (e: any) => {
    // 更新helperRef中的scrollTop
    helperRef.current.scrollTop = e.detail.scrollTop;
    const { scrollTop, refreshTriggered } = helperRef.current;

    // 向下滚动超过200px，且未触发过刷新时执行刷新
    if (scrollTop > 200 && !refreshTriggered && !refreshing[activeTabKey]) {
      // 更新helperRef中的触发标记
      helperRef.current.refreshTriggered = true;
      setRefreshing(prev => ({ ...prev, [activeTabKey]: true }));

      // 模拟接口请求延迟
      setTimeout(() => {
        mockRefreshData(activeTabKey);
        setRefreshing(prev => ({ ...prev, [activeTabKey]: false }));
      }, 1000);
    }

    // 滚动回顶部时重置触发标记
    if (scrollTop <= 100) {
      helperRef.current.refreshTriggered = false;
    }
  };

  // 渲染列表项（调整布局：价格+已团人数同行，标题最多两行省略）
  const renderListItem = (item: any) => (
    <View 
      key={item.id} 
      className="group-buy-list__item"
      onClick={() => {
        Taro.navigateTo({ url: '/pages/group-buy-detail/index' })
      }}
    >
      <Image 
        className="group-buy-list__item-img"
        src={item.image}
        mode="aspectFill"
      />
      <View className="group-buy-list__item-info">
        <Text className="group-buy-list__item-title">{item.title}</Text>
        {/* 新增：价格+已团人数同行容器 */}
        <View className="group-buy-list__item-meta">
          <Text className="group-buy-list__item-price">¥{item.price.toFixed(2)}</Text>
          <Text className="group-buy-list__item-sold">{item.soldCount}人已团</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View className="group-buy-list">
      {/* 自定义Tab栏 - 横向滚动 */}
      <ScrollView 
        className="group-buy-list__tab-bar" 
        scrollX 
        scrollWithAnimation
        showScrollbar={false}
      >
        <View className="group-buy-list__tab-container">
          {tabConfig.map((tab) => (
            <View
              key={tab.key}
              className={`group-buy-list__tab-item ${activeTabKey === tab.key ? 'group-buy-list__tab-item--active' : ''}`}
              onClick={() => handleTabChange(tab.key)}
            >
              <Text className="group-buy-list__tab-text">{tab.label}</Text>
              {activeTabKey === tab.key && (
                <View className="group-buy-list__tab-underline"></View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 列表区域 - 向下滚动刷新 */}
      <ScrollView 
        ref={scrollRef}
        className="group-buy-list__list-container" 
        scrollY
        onScroll={handleScroll}
        scrollWithAnimation
      >
        {/* 刷新提示（刷新时显示） */}
        {refreshing[activeTabKey] && (
          <View className="group-buy-list__refresh-tips">
            <Text className="group-buy-list__refresh-text">正在刷新数据...</Text>
          </View>
        )}

        {/* 列表内容 */}
        {listData.length > 0 ? (
          listData.map(renderListItem)
        ) : (
          <View className="group-buy-list__empty">
            <Text className="group-buy-list__empty-text">暂无数据</Text>
          </View>
        )}

        {/* 列表底部提示 */}
        {listData.length > 0 && !refreshing[activeTabKey] && (
          <View className="group-buy-list__end">
            <Text className="group-buy-list__end-text">以上为全部</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default memo(GroupBuyList);