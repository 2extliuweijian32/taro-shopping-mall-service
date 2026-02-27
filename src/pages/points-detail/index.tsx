import React, { FC, memo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';

// 积分明细数据类型
interface PointRecord {
  title: string;
  time: string;
  point: number;
  desc: string;
}

const PointsDetail: FC = () => {
  // 模拟积分明细数据
  const pointRecords: PointRecord[] = [
    { title: '签到发放积分', time: '2026-02-03 13:52:11', point: +1, desc: '签到发放积分' },
    { title: '停车费扣减', time: '2025-11-24 11:49:19', point: -300, desc: '积分抵停车费' },
    { title: '鱼你在一起', time: '2025-10-25 18:12:23', point: +36, desc: '消费积分' },
    { title: '鱼你在一起', time: '2025-10-25 12:03:22', point: +33, desc: '消费积分' },
    { title: '新会员开卡礼遇发资源...', time: '2025-10-23 18:59:50', point: +300, desc: '促销奖励' },
  ];

  // 计算总积分
  const totalPoints = pointRecords.reduce((sum, item) => sum + item.point, 0);

  // 联系客服（拨打电话，替换为实际客服号码）
  const handleCallService = () => {
    const servicePhone = '400-123-4567'; // 替换为真实客服电话
    Taro.makePhoneCall({
      phoneNumber: servicePhone,
      fail: (err) => {
        Taro.showToast({ title: '拨打电话失败', icon: 'none' });
        console.error('拨打电话异常：', err);
      }
    });
  };

  return (
    <View className="points-detail">
      {/* 总积分展示区 */}
      <View className="points-detail__total">
        <View className="points-detail__total-left">
          <Text className="points-detail__total-label">总积分</Text>
          <View className="points-detail__total-num-wrap">
            <Text className="points-detail__total-num">{totalPoints}</Text>
            <Text className="points-detail__total-unit">积分</Text>
          </View>
        </View>
        <Text className="points-detail__total-contact" onClick={handleCallService}>
          联系客服
        </Text>
      </View>

      {/* 积分信息列表 */}
      <View className="points-detail__list">
        <View className="points-detail__list-title">积分信息</View>
        {pointRecords.map((item, index) => (
          <View key={index} className="points-detail__list-item">
            <View className="points-detail__list-item-left">
              <Text className="points-detail__list-item-title">{item.title}</Text>
              <Text className="points-detail__list-item-time">{item.time}</Text>
            </View>
            <View className="points-detail__list-item-right">
              <Text className={`points-detail__list-item-point ${item.point > 0 ? 'points-detail__list-item-point--add' : 'points-detail__list-item-point--reduce'}`}>
                {item.point > 0 ? '+' : ''}{item.point}
              </Text>
              <Text className="points-detail__list-item-desc">{item.desc}</Text>
            </View>
          </View>
        ))}

        {/* 无更多数据提示 */}
        {pointRecords.length > 0 && (
          <View className="points-detail__list-empty">
            <Text className="points-detail__list-empty-text">以上为全部</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(PointsDetail);