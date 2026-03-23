import { View, Text, Image, Button } from '@tarojs/components';
import React from 'react';
import './index.scss';

const UserCenter: React.FC = () => {
  const userInfo = {
    name: '用户4925',
    level: '普卡',
    validPoints: 70,
    expirePoints: 0,
    cardNo: 'No.2025 0001 4795 97'
  };

  const menuConfig = {
    cardCoupon: [
      { name: '我的券包', icon: '券包' },
      { name: '礼包订单', icon: '订单' },
      { name: '自助积分', icon: '积分' },
      { name: '积分查询', icon: '查询' },
      { name: '我的订单', icon: '我的' }
    ],
    memberCenter: [
      { name: '卓越储值卡', icon: '储值卡' },
      { name: '意见反馈', icon: '反馈' },
      { name: '关于我们', icon: '关于' }
    ],
    service: [
      { name: '披肩租借', icon: '披肩' },
      { name: '雨伞租借', icon: '雨伞' },
      { name: '婴儿推车租借', icon: '推车' },
      { name: '打印复印', icon: '打印' },
      { name: '礼品包装', icon: '包装' },
      { name: '便民药箱', icon: '药箱' },
      { name: '购物咨询', icon: '咨询' },
      { name: '女神服务', icon: '女神' }
    ]
  };

  const renderMenu = (list: Array<{ name: string; icon: string }>, className: string) => {
    return (
      <View className={className}>
        {list.map((item, index) => (
          <View key={index} className="user-center__menu-item">
            <View className="user-center__menu-icon">{item.icon}</View>
            <Text className="user-center__menu-text">{item.name}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View className="user-center">
      <View className="user-center__user-info">
        <View className="user-center__avatar">
          <Image 
            src="https://via.placeholder.com/80/FF9900/FFFFFF?text=头像" 
            mode="aspectFill" 
            className="user-center__avatar-img"
          />
        </View>
        <View className="user-center__user-name">
          <Text className="user-center__name-text">{userInfo.name}</Text>
          <Text className="user-center__level-tag">{userInfo.level}</Text>
        </View>
      </View>

      <View className="user-center__points">
        <View className="user-center__points-item">
          <Text className="user-center__points-num">{userInfo.validPoints}</Text>
          <Text className="user-center__points-desc">当前有效积分</Text>
        </View>
        <View className="user-center__points-item">
          <Text className="user-center__points-num">{userInfo.expirePoints}</Text>
          <Text className="user-center__points-desc">即将到期积分</Text>
        </View>
      </View>

      <View className="user-center__card">
        <Text className="user-center__card-title">会员卡</Text>
        <View className="user-center__card-bg">
          <Image 
            src="https://via.placeholder.com/700/EEEEEE/FFFFFF?text=VIP普卡会员" 
            mode="widthFix" 
            className="user-center__card-img"
          />
        </View>
        <View className="user-center__card-info">
          <Text className="user-center__card-no">{userInfo.cardNo}</Text>
          <View className="user-center__card-btn">
            会员码
          </View>
        </View>
      </View>

      <View className="user-center__module">
        <Text className="user-center__module-title">我的卡券</Text>
        {renderMenu(menuConfig.cardCoupon, 'user-center__menu user-center__menu--5col')}
      </View>

      <View className="user-center__module">
        <Text className="user-center__module-title">会员中心</Text>
        {renderMenu(menuConfig.memberCenter, 'user-center__menu user-center__menu--3col')}
      </View>

      <View className="user-center__module">
        <Text className="user-center__module-title">客服台服务</Text>
        {renderMenu(menuConfig.service, 'user-center__menu user-center__menu--4col')}
      </View>
    </View>
  );
};

export default UserCenter;