import React, { FC, memo, useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import { InputNumber } from '@nutui/nutui-react-taro';
import './index.scss';

const GiftConfirmOrder: FC = () => {
  const [count, setCount] = useState(1);
  const [currentPoints, setCurrentPoints] = useState(70); // 当前积分
  const requiredPoints = 699; // 所需积分
  const isExchangeable = currentPoints >= requiredPoints; // 判断是否可兑换

  return (
    <View className="gift-confirm-order">
      <ScrollView className="gift-confirm-order__scroll" scrollY>
        {/* 商品头部 */}
        <View className="gift-confirm-order__header">
          <Image
            className="gift-confirm-order__header-img"
            src="https://placeholder.pics/svg/160x160/F5F5F5/333333/好事hua生红包"
          />
          <View className="gift-confirm-order__header-info">
            <Text className="gift-confirm-order__title">好事hua生|新年特别联名款红包</Text>
            <Text className="gift-confirm-order__points">699积分</Text>
          </View>
        </View>

        {/* 数量区域 */}
        <View className="gift-confirm-order__section">
          <Text className="gift-confirm-order__section-title">数量</Text>
          <View className="gift-confirm-order__count-wrap">
            <Text className="gift-confirm-order__limit-tips">限购1件</Text>
            <InputNumber
              value={count}
              min={1}
              max={1}
              onChange={(value) => setCount(value as number)}
              className="gift-confirm-order__input-number"
              style={{
                '--nutui-inputnumber-button-width': '28px',
                '--nutui-inputnumber-button-height': '24px',
                '--nutui-inputnumber-icon-size': '16px',
                '--nutui-inputnumber-input-width': '24px',
                '--nutui-inputnumber-input-height': '24px',
                '--nutui-inputnumber-input-font-size': '16px'
              }}
            />
          </View>
        </View>

        {/* 兑换地址 */}
        <View className="gift-confirm-order__section">
          <Text className="gift-confirm-order__section-title">兑换地址</Text>
          <Text className="gift-confirm-order__address">商场B1层客服中心</Text>
        </View>

        {/* 总价区域（标题+积分同行，提示单独一行） */}
        <View className="gift-confirm-order__section" style={{ borderBottom: 'none', paddingBottom: '4px' }}>
          <Text className="gift-confirm-order__section-title">总价</Text>
          <View className="gift-confirm-order__price-area">
            <Text className="gift-confirm-order__total-points">{requiredPoints}积分</Text>
          </View>
        </View>

        {/* 积分提示（单独一行） */}
        <View className="gift-confirm-order__tips-wrap">
          <Text className="gift-confirm-order__tips">
            您的当前积分为{currentPoints}积分，若兑换失败，系统将自动退还支付金额和积分。
          </Text>
        </View>
      </ScrollView>

      {/* 底部兑换按钮（保持confirmOrder大小） */}
      <View 
        className={`gift-confirm-order__exchange-btn ${isExchangeable ? '' : 'gift-confirm-order__exchange-btn--disabled'}`}
        style={{ pointerEvents: isExchangeable ? 'auto' : 'none' }}
      >
        <Text className="gift-confirm-order__exchange-text">
          {isExchangeable ? '确认兑换' : '积分不足，无法兑换'}
        </Text>
      </View>
    </View>
  );
};

export default memo(GiftConfirmOrder);