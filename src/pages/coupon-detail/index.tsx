import React, { FC, memo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

// 券状态枚举
export enum CouponStatus {
  ToUse = '待使用',
  Used = '已使用',
  Expired = '已过期'
}

// 券详情数据接口
interface CouponDetail {
  id: string;
  couponName: string; // 券名称
  denomination: number; // 券面额
  usableCondition: string; // 使用条件
  validStart: string; // 有效期开始
  validEnd: string; // 有效期结束
  expireTime: string; // 过期时间（已过期时显示）
  useTime: string; // 使用时间（已使用时显示）
  status: CouponStatus; // 券状态
  couponCode: string; // 券码
  thumbImg: string; // 券缩略图
  useScope: string; // 使用范围
  useRules: string[]; // 使用规则
  notes: string[]; // 注意事项
}

const CouponDetail: FC = () => {
  // 模拟数据：已移除前海/卓悦/INTOWN等关键字，状态设为「已过期」示例
  const couponDetail: CouponDetail = {
    id: '10001',
    couponName: '【新会员】200元服饰代金券',
    denomination: 200,
    usableCondition: '满1000元可用',
    validStart: '2025-06-05',
    validEnd: '2025-12-31',
    expireTime: '2025.12.31 23:59',
    useTime: '2025.10.01 15:30',
    status: CouponStatus.Expired,
    couponCode: '9570-4170-8409-1032-02',
    thumbImg: 'https://placeholder.pics/svg/80x80/FFF/000/服饰代金券',
    useScope: '品牌线下直营门店',
    useRules: [
      '1. 券可在品牌线下直营门店注册新会员后获得；',
      '2. 本券购买正价货品实付金额满1000元方可使用，不可与其他优惠权益及优惠券叠加使用；',
      '3. 单笔订单限用一张优惠券；券仅可作一次使用，不可兑换、找赎现金，请在购物收银时出示；',
      '4. 券有效期：即日起—2025年12月31日；',
      '5. 使用地点：品牌各线下直营门店'
    ],
    notes: [
      '使用前请确认店铺是否参与活动，部分门店可能不适用',
      '如有疑问可联系品牌客服：400-888-8888',
      '本券最终解释权归品牌方所有'
    ]
  };

  return (
    <View className="coupon-detail">
      {/* 核心券卡片 */}
      <View className={`coupon-card coupon-card--${couponDetail.status.toLowerCase()}`}>
        {/* 券缩略图 + 名称 */}
        <View className="coupon-card__header">
          <Image className="coupon-card__thumb" src={couponDetail.thumbImg} mode="aspectFit" />
          <View className="coupon-card__header-info">
            <Text className="coupon-card__name">{couponDetail.couponName}</Text>
            <Text className="coupon-card__condition">{couponDetail.usableCondition}</Text>
          </View>
        </View>

        {/* 分割线 */}
        <View className="coupon-card__divider"></View>

        {/* 状态（券码上方） */}
        <View className="coupon-card__status-wrap">
          <Text className={`coupon-card__status coupon-card__status--${couponDetail.status.toLowerCase()}`}>
            {couponDetail.status}
          </Text>
        </View>

        {/* 券码（按状态区分样式） */}
        <View className="coupon-card__code">
          <Text className={`coupon-card__code-text coupon-card__code-text--${couponDetail.status.toLowerCase()}`}>
            {couponDetail.couponCode}
          </Text>
        </View>

        {/* 有效期 + 过期/使用时间（同行居中、缩小字体） */}
        <View className="coupon-card__valid">
          <View className="coupon-card__valid-row">
            <Text className="coupon-card__valid-label">有效期：</Text>
            <Text className="coupon-card__valid-period">
              {couponDetail.validStart} 00:00 ~ {couponDetail.validEnd} 23:59
            </Text>
          </View>

          {/* 已过期/已使用时间（居中） */}
          {couponDetail.status === CouponStatus.Expired || couponDetail.status === CouponStatus.Used ? (
            <Text className="coupon-card__expire-use-time">
              {couponDetail.status === CouponStatus.Expired 
                ? `已于${couponDetail.expireTime}过期` 
                : `已于${couponDetail.useTime}使用`
              }
            </Text>
          ) : null}
        </View>
      </View>

      {/* 券详情卡片 */}
      <View className="coupon__detail-card">
        <View className="coupon__detail-header">
          <Text className="coupon__detail-title">券详情</Text>
          <Text className="coupon__detail-tag">优惠券</Text>
        </View>

        {/* 券内容 */}
        <View className="coupon__detail-content">
          <Text className="coupon__detail-label">券内容</Text>
          <Text className="coupon__detail-value">
            {couponDetail.denomination}元代金券（{couponDetail.usableCondition}）
          </Text>
        </View>

        {/* 使用时段 */}
        <View className="coupon__detail-content">
          <Text className="coupon__detail-label">使用时段</Text>
          <Text className="coupon__detail-value">周一 周二 周三 周四 周五 周六 周日</Text>
        </View>

        {/* 使用须知 */}
        <View className="coupon__detail-content">
          <Text className="coupon__detail-label">使用须知</Text>
          <View className="coupon__rule-list">
            {couponDetail.useRules.map((rule, index) => (
              <View key={index} className="coupon__rule-item">
                <Text className="coupon__rule-text">{rule}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 适用范围 */}
        <View className="coupon__detail-content">
          <Text className="coupon__detail-label">适用范围</Text>
          <Text className="coupon__detail-value">{couponDetail.useScope}</Text>
        </View>
      </View>

      {/* 注意事项卡片 */}
      <View className="coupon__note-card">
        <Text className="coupon__note-title">注意事项</Text>
        <View className="coupon__note-list">
          {couponDetail.notes.map((note, index) => (
            <View key={index} className="coupon__note-item">
              <Text className="coupon__note-text">{note}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default memo(CouponDetail);