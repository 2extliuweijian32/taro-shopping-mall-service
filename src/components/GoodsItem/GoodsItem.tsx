import React, { FC, memo } from 'react';
import { View, Text, Image } from '@tarojs/components';
import './GoodsItem.scss';

// 定义商品状态枚举
export enum GoodsStatus {
  /** 正常状态（无胶囊展示） */
  NORMAL = 'normal',
  /** 售罄状态 */
  SOLD_OUT = 'sold_out',
  /** 秒杀中状态 */
  SEC_KILL = 'sec_kill',
  /** 已下架状态 */
  OFF_SHELF = 'off_shelf'
}

// 定义商品组件 Props 接口
interface GoodsItemProps {
  imgUrl: string;
  name: string;
  price?: number;
  score?: number;
  status?: GoodsStatus;
}

// 定义状态对应的胶囊配置（文案 + 类名）
const statusCapsuleConfig = {
  [GoodsStatus.SOLD_OUT]: {
    text: '已售罄',
    className: 'goods-item__status-capsule--sold-out'
  },
  [GoodsStatus.SEC_KILL]: {
    text: '秒杀中',
    className: 'goods-item__status-capsule--sec-kill'
  },
  [GoodsStatus.OFF_SHELF]: {
    text: '已下架',
    className: 'goods-item__status-capsule--off-shelf'
  }
};

// 通用商品组件（用 memo 包裹，避免不必要重渲染）
const GoodsItem: FC<GoodsItemProps> = ({
  imgUrl,
  name,
  price,
  score,
  status = GoodsStatus.NORMAL
}) => {
  const needShowCapsule = status !== GoodsStatus.NORMAL;
  const capsuleConfig = needShowCapsule ? statusCapsuleConfig[status] : null;
  const isOffShelf = status === GoodsStatus.OFF_SHELF;

  return (
    <View className={`goods-item ${isOffShelf ? 'goods-item--off-shelf' : ''}`}>
      <View className="goods-item__img-wrap">
        <Image 
          src={imgUrl} 
          className="goods-item__img"
          mode="aspectFill"
        />
        {needShowCapsule && capsuleConfig && (
          <View className={`goods-item__status-capsule ${capsuleConfig.className}`}>
            <Text className="goods-item__status-capsule__text">{capsuleConfig.text}</Text>
          </View>
        )}
      </View>
      <Text className="goods-item__name">{name}</Text>
      <View className="goods-item__price">
        {price !== undefined && (
          <Text className="goods-item__price__content">¥{price.toFixed(2)}</Text>
        )}
        {score !== undefined && (
          <Text className="goods-item__price__content">{score} 积分</Text>
        )}
      </View>
    </View>
  );
};

// 用 React.memo 包裹组件，提升性能
export default memo(GoodsItem);