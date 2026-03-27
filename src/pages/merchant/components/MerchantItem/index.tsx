import { View, Text, Image } from '@tarojs/components';
import React from 'react';
import './index.scss';
import { Merchant } from '../../types';

interface MerchantItemProps {
  merchant: Merchant;
}

const MerchantItem: React.FC<MerchantItemProps> = ({ merchant }) => {
  return (
    <View className="merchant-item">
      <View className="merchant-item__icon">
        <Image 
          src={merchant.icon} 
          mode="aspectFill" 
          className="merchant-item__icon-img"
        />
      </View>
      <Text className="merchant-item__name">{merchant.name}</Text>
    </View>
  );
};

export default MerchantItem;