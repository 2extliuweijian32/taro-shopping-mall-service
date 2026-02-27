import React, { FC, memo, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import Taro from '@tarojs/taro';


const GiftDetail: FC = () => {
  const [isExchangeable] = useState(true);
  return (
    <View className="gift-detail">
      <ScrollView className="gift-detail__scroll" scrollY>
        <View 
          className="gift-detail__banner" 
          style={{ backgroundImage: `url(https://placeholder.pics/svg/750x300/FFFFFF-E6E6E6/维达抽纸)` }}
        >
          <View className="gift-detail__countdown">
            <Text className="gift-detail__countdown-text">距离结束时间</Text>
            <Text className="gift-detail__countdown-day">18天</Text>
          </View>
          <View className="gift-detail__sales">已售出 128 件</View>
        </View>

        <View className="gift-detail__header">
          <Text className="gift-detail__title">维达抽纸</Text>
          <View className="gift-detail__share">
            <Text className="gift-detail__share-text">分享</Text>
          </View>
        </View>

        <View className="gift-detail__section">
          <Text className="gift-detail__section-title">兑换物品</Text>
          <View className="gift-detail__item-card">
            <View className="gift-detail__item-img"></View>
            <View className="gift-detail__item-info">
              <Text className="gift-detail__item-title">维达抽纸</Text>
              <Text className="gift-detail__item-desc">领券后当天生效，生效第10天22:00失效</Text>
            </View>
            <View className="gift-detail__item-count-wrap">
              <Text className="gift-detail__item-count">X1</Text>
            </View>
          </View>
        </View>

        <View className="gift-detail__section">
          <Text className="gift-detail__section-title">物品详情</Text>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">兑换地点:</Text>
            <Text className="gift-detail__detail-value">商场B1层客服中心</Text>
          </View>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">领取时间:</Text>
            <Text className="gift-detail__detail-value gift-detail__detail-value--highlight">
              兑换之日起10天内有效，请于商场营业时间内核销领取，逾期作废，积分不予退还;
            </Text>
          </View>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">领取礼品需在商场营业时间内领取，商场营业时间:</Text>
            <Text className="gift-detail__detail-value">周一至周日：10:00-22:00</Text>
          </View>
        </View>

        <View className="gift-detail__section">
          <Text className="gift-detail__section-title">使用规则</Text>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">兑换地点:</Text>
            <Text className="gift-detail__detail-value">商场B1层客服中心</Text>
          </View>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">领取时间:</Text>
            <Text className="gift-detail__detail-value gift-detail__detail-value--highlight">
              兑换之日起10天内有效，请于商场营业时间内核销领取，逾期作废，积分不予退还;
            </Text>
          </View>
          <View className="gift-detail__detail-list">
            <Text className="gift-detail__detail-label">使用详情:</Text>
            <View className="gift-detail__rule-list">
              <Text className="gift-detail__rule-item gift-detail__rule-item--highlight">
                1.活动规则:兑换领取礼品需配合工作人员出示相关消费支付凭证;
              </Text>
              <Text className="gift-detail__rule-item">
                2.电子券查看路径:商场小程序首页-个人中心-我的券包。
              </Text>
              <Text className="gift-detail__rule-item">
                3.请现场查验礼品,如有质量问题可现场换货,离柜不再退换货;
              </Text>
              <Text className="gift-detail__rule-item">
                4.礼品一个会员ID仅限兑换1次，礼品一经兑换，恕不接受退换;
              </Text>
              <Text className="gift-detail__rule-item">
                5.图片仅供参考，款式/颜色随机发放，请以最终实物为准;
              </Text>
              <Text className="gift-detail__rule-item">
                6.礼品限会员本人现场领取，限线下自提，不支持以截图、代领、快递等方式;
              </Text>
              <Text className="gift-detail__rule-item">
                7.如有其它疑问，请致电:0755-12345678;
              </Text>
              <Text className="gift-detail__rule-item">
                8.在法律范围内，最终解释权归本购物中心所有;
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="gift-detail__footer">
        <Text className="gift-detail__points">200积分</Text>
        <View 
          className={`gift-detail__exchange-btn ${!isExchangeable ? 'gift-detail__exchange-btn--disabled' : ''}`}
          style={{ pointerEvents: isExchangeable ? 'auto' : 'none' }}
          onClick={() => {
            Taro.navigateTo({ url: '/pages/gift-confirm-order/index' })
          }}
        >
          <Text className="gift-detail__exchange-text">
            {isExchangeable ? '立即兑换' : '已售罄'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(GiftDetail);