import { View, ScrollView, Text } from '@tarojs/components';
import React, { useEffect, useRef } from 'react';
import './index.scss';
import MerchantItem from '../MerchantItem';
import { Merchant } from '../../types';

interface MerchantListProps {
  merchants: Merchant[];
  loading: boolean;
  hasMore: boolean;
  onReachBottom: () => void;
}

const MerchantList: React.FC<MerchantListProps> = ({ merchants, loading, hasMore, onReachBottom }) => {
  const scrollRef = useRef<any>(null);

  // 滚动到底部触发加载
  const handleScrollToLower = () => {
    if (!loading && hasMore) {
      onReachBottom();
    }
  };

  return (
    <ScrollView
      ref={scrollRef}
      className="merchant-list"
      scrollY
      onScrollToLower={handleScrollToLower}
      lowerThreshold={50}
    >
      <View className="merchant-list__grid">
        {merchants.map((item) => (
          <MerchantItem key={item.id} merchant={item} />
        ))}
      </View>
      {loading && (
        <View className="merchant-list__loading">
          <Text className="merchant-list__loading-text">加载中...</Text>
        </View>
      )}
      {!hasMore && !loading && merchants.length > 0 && (
        <View className="merchant-list__nomore">
          <Text className="merchant-list__nomore-text">没有更多商户了</Text>
        </View>
      )}
      {merchants.length === 0 && !loading && (
        <View className="merchant-list__empty">
          <Text className="merchant-list__empty-text">暂无匹配的商户</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default MerchantList;