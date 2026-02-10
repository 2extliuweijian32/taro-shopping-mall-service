import React, { FC, memo, useState } from 'react';
import { View, Text, Image, Textarea } from '@tarojs/components';
import { InputNumber } from '@nutui/nutui-react-taro';
import './index.scss';

const ConfirmOrder: FC = () => {
  const [count, setCount] = useState(2);
  const price = 78;

  return (
    <View className="confirm-order">
      {/* 订单头部 */}
      <View className="confirm-order__header">
        <Image
          className="confirm-order__header-img"
          src="https://placeholder.pics/svg/80x80/F5F5F5/333333/商品1"
        />
        <View className="confirm-order__header-info">
          <Text className="confirm-order__title">好食连连-工作日晚餐78团100</Text>
          <Text className="confirm-order__price">¥{price.toFixed(2)}</Text>
        </View>
      </View>

      {/* 数量区域 */}
      <View className="confirm-order__section">
        <Text className="confirm-order__section-title">数量</Text>
        <View className="confirm-order__count-wrap">
          <InputNumber
            value={count}
            min={1}
            max={2}
            readOnly
            onChange={(value) => setCount(value as number)}
            className="confirm-order__input-number"
            style={{
              '--nutui-inputnumber-button-width': '28px',
              '--nutui-inputnumber-button-height': '24px',
              '--nutui-inputnumber-icon-size': '16px',
              '--nutui-inputnumber-input-width': '24px',
              '--nutui-inputnumber-input-height': '24px'
            }}
          />
          <Text className="confirm-order__tips">最多可购买2件</Text>
        </View>
      </View>

      {/* 总价区域 */}
      <View className="confirm-order__section">
        <Text className="confirm-order__section-title">总价</Text>
        <Text className="confirm-order__total-price">¥{(count * price).toFixed(2)}</Text>
      </View>

      {/* 买家留言区域（带垂直布局修饰符） */}
      <View className="confirm-order__section confirm-order__section--vertical">
        <Text className="confirm-order__section-title">买家留言</Text>
        <Textarea
          className="confirm-order__message-textarea"
          placeholder="请输入您想要留言的消息"
        />
      </View>

      {/* 提交按钮 */}
      <View className="confirm-order__submit-btn">
        <Text className="confirm-order__submit-text">确认下单</Text>
      </View>
    </View>
  );
};

export default memo(ConfirmOrder);