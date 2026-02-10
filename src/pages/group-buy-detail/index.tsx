import React, { FC, memo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import './index.scss';
import { ArrowRight } from '@nutui/icons-react-taro';
import { Dialog } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';

const GroupBuyDetail: FC = () => {
  return (
    <View className="group-buy-detail">
      <ScrollView className="group-buy-detail__scroll" scrollY>
        <View className="group-buy-detail__banner" style={{ backgroundImage: 'url(https://placeholder.pics/svg/400x300/F5F5F5/333333/商品1)' }}></View>
        <View className="group-buy-detail__header">
          <Text className="group-buy-detail__title">好食连连-工作日晚餐78团100</Text>
          <View className="group-buy-detail__tags">
            <Text className="group-buy-detail__tag">限购2件</Text>
            <Text className="group-buy-detail__tag">任性退</Text>
            <Text className="group-buy-detail__tag">过期退</Text>
          </View>
        </View>

        <View 
          className="group-buy-detail__section"
          onClick={() =>
            Dialog.open('dialog', {
              title: '以下等级可购买',
              content: '青铜、白银、黄金、铂金',
              confirmText: '知道了',
              hideCancelButton: true,
              onConfirm: () => {
                Dialog.close('dialog')
              },
            })
          }
        >
          <Text className="group-buy-detail__section-title">会员专享</Text>
          <ArrowRight color="#333" size={16} />
        </View>

        <View className="group-buy-detail__section group-buy-detail__section--vertical">
          <Text className="group-buy-detail__section-title">团购物品</Text>
          <View className="group-buy-detail__item-card">
            <Text className="group-buy-detail__item-title">好食连连-工作日晚餐78团100</Text>
            <Text className="group-buy-detail__item-desc">领券后当天生效，生效第7天失效</Text>
            <View className="group-buy-detail__merchants">
              <Text className="group-buy-detail__merchant">爱碗亭</Text>
              <Text className="group-buy-detail__merchant">龙发鸡煲</Text>
              <Text className="group-buy-detail__merchant">蓉城小馆</Text>
            </View>
          </View>
        </View>

        <View className="group-buy-detail__section group-buy-detail__section--vertical">
          <Text className="group-buy-detail__section-title">购买须知</Text>
          <View className="group-buy-detail__rule-list">
            <Text className="group-buy-detail__rule-item">1. 本券购买期：2026.1.19-2026.2.14，数量有限，售完即止；</Text>
            <Text className="group-buy-detail__rule-item group-buy-detail__rule-item--highlight">2. 核销使用期：该券购买日起7日有效，工作日17:00-22:00可使用，请在有效核销期使用；</Text>
            <Text className="group-buy-detail__rule-item">3. 单笔消费满100元可使用1张，每人限购2张，每单限用2张，不与店内其他优惠同享；</Text>
            <Text className="group-buy-detail__rule-item">4. 本券仅适用于餐饮店铺核销使用：爱碗亭、龙发鸡煲、蓉城小馆、润园四季、八合里、黑旨烧肉、缪氏川菜、星卡萨铁板烧、豪雅苑、豪小馆</Text>
          </View>
        </View>

        <View className="group-buy-detail__section group-buy-detail__section--vertical">
          <Text className="group-buy-detail__section-title">团购说明</Text>
          <View className="group-buy-detail__rule-list">
            <Text className="group-buy-detail__rule-item group-buy-detail__rule-item--highlight">5. 本券一经核销概不退款；</Text>
            <Text className="group-buy-detail__rule-item">6. 逾期未核销过的礼包，系统将会自动退款至相应购买方账户；</Text>
            <Text className="group-buy-detail__rule-item">7. 本券不兑换现金、不挂失、不找零、不含酒水\饮料\纸巾\酱料\茶位，仅限堂食使用，发票以现场实际情况为准；</Text>
            <Text className="group-buy-detail__rule-item">8. 具体使用细则请至活动门店咨询，参与品牌如有变动以场内告示为准。</Text>
          </View>
        </View>

        <View 
          className="group-buy-detail__section"
          onClick={() =>
            Dialog.open('dialog', {
              title: '退款详情',
              content: '请在电子券有效期内使用，如过期未使用系统将在7个工作日内退款',
              confirmText: '知道了',
              hideCancelButton: true,
              onConfirm: () => {
                Dialog.close('dialog')
              },
            })
          }
        >
          <Text className="group-buy-detail__section-title">退款说明</Text>
          <ArrowRight color="#333" size={16} />
        </View>
      </ScrollView>

      <View className="group-buy-detail__footer">
        <View className="group-buy-detail__price-info">
          <Text className="group-buy-detail__price">¥78.00</Text>
          <Text className="group-buy-detail__sales">已售出548件</Text>
        </View>
        <View 
          className="group-buy-detail__buy-btn"
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/confirm-order/index'
            })
          }}
        >立即抢购</View>
      </View>

      <Dialog id="dialog"/>
    </View>
  );
};

export default memo(GroupBuyDetail);