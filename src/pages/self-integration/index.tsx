import React, { FC, memo } from 'react';
import { View, Text, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './index.scss';
import { ArrowRight, Check, Clock, Feedback, Photograph, Refund, Store, SuccessF, Tips, ToReceive } from '@nutui/icons-react-taro';

const SelfIntegration: FC = () => {

  // 查看我的积分
  const handleViewPoints = () => {
    Taro.navigateTo({ url: '/pages/points-detail/index' });
  };

  // 拍票据得积分（仅调用相机，禁用相册）
  const handleTakeBill = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'], // 仅保留相机，移除album，禁用相册选择
      success: (res) => {
        // 后续可上传图片进行OCR识别
        Taro.showToast({ title: '票据拍摄成功', icon: 'success' });
      },
      fail: (err) => {
        // 处理用户取消拍摄或权限不足
        if (err.errMsg !== 'chooseImage:fail cancel') {
          Taro.showToast({ title: '拍摄失败，请检查相机权限', icon: 'none' });
        }
      }
    });
  };

  // 查看积分规则
  const handleViewRules = () => {
    Taro.navigateTo({ url: '/pages/integration-rules/index' });
  };

  // 查看申请记录
  const handleViewRecords = () => {
    Taro.navigateTo({ url: '/pages/application-records/index' });
  };

  // 基于 placeholder.pics 生成的线上mock图片（匹配风格，带emoji相关视觉）
  const mockAvatar = 'https://placeholder.pics/svg/40x40/1677FF/FFFFFF/SHOP'; // 商场头像
  const mockBill = 'https://placeholder.pics/svg/120x180/F5F5F5/1677FF/票据示例'; // 票据示例图
  const mockShooting = 'https://placeholder.pics/svg/120x180/F5F5F5/1677FF/拍摄姿势'; // 拍摄姿势图

  return (
    <View className="self-integration">

      {/* 头部信息区 */}
      <View className="self-integration__header">
        <View className="self-integration__header-info">
          <View
            className="self-integration__header-avatar"
            style={{ backgroundImage: `url(${mockAvatar})` }}
          />
          <Text className="self-integration__header-name">无敌海景商场中心</Text>
        </View>
        <View className="self-integration__header-points" onClick={handleViewPoints}>
          <Text className="self-integration__header-points-num">69</Text>
          <View className="self-integration__header-points-text">我的积分 <ArrowRight size={18} color="#666" /></View>
        </View>
      </View>

      {/* 核心内容区 */}
      <View className="self-integration__content">
        {/* 四要素说明（优化布局，更美观精致） */}
        <View className="self-integration__section">
          <Text className="self-integration__section-title">需清晰拍摄以下四要素</Text>
          <View className="self-integration__factors">
            <View className="self-integration__factor-item">
              <View className="self-integration__factor-icon"><ToReceive color="#1677ff" size={18} /></View>
              <Text className="self-integration__factor-text">商场名</Text>
            </View>
            <View className="self-integration__factor-item">
              <View className="self-integration__factor-icon"><Store color="#1677ff" size={18} /></View>
              <Text className="self-integration__factor-text">商户名</Text>
            </View>
            <View className="self-integration__factor-item">
              <View className="self-integration__factor-icon"><Refund color="#1677ff" size={18} /></View>
              <Text className="self-integration__factor-text">消费金额</Text>
            </View>
            <View className="self-integration__factor-item">
              <View className="self-integration__factor-icon"><Clock color="#1677ff" size={18} /></View>
              <Text className="self-integration__factor-text">消费时间</Text>
            </View>
          </View>
        </View>

        {/* 拍摄方式（文案换行，mock图片更新） */}
        <View className="self-integration__section">
          <Text className="self-integration__section-title">拍摄方式</Text>
          <View className="self-integration__shooting">
            <View className="self-integration__shooting-item">
              <View
                className="self-integration__shooting-img"
                style={{ backgroundImage: `url(${mockBill})` }}
              />
              <View className="self-integration__shooting-check">
                <SuccessF color="#1677ff" size={18} />
              </View>
              <Text className="self-integration__shooting-text">拍摄票据{'\n'}完整清晰</Text> {/* 换行处理 */}
            </View>
            <View className="self-integration__shooting-item">
              <View
                className="self-integration__shooting-img"
                style={{ backgroundImage: `url(${mockShooting})` }}
              />
              <View className="self-integration__shooting-check">
                <SuccessF color="#1677ff" size={18} />
              </View>
              <Text className="self-integration__shooting-text">建议拍摄时{'\n'}票面平行于手机</Text> {/* 换行处理 */}
            </View>
          </View>
        </View>

        {/* 支持票类 */}
        <View className="self-integration__section">
          <Text className="self-integration__section-title">支持票类 <Text className="self-integration__section-tip">以商户实际支持票类为准</Text></Text>
          <View className="self-integration__ticket-types">
            <View className="self-integration__ticket-item">
              <Text className="self-integration__ticket-check"><Check size={18} color="#1677ff" /></Text>
              <Text className="self-integration__ticket-text">结账单</Text>
            </View>
            <View className="self-integration__ticket-item">
              <Text className="self-integration__ticket-check"><Check size={18} color="#1677ff" /></Text>
              <Text className="self-integration__ticket-text">消费清单</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 主按钮 */}
      <View className="self-integration__btn-section">
        <Button
          className="self-integration__main-btn"
          onClick={handleTakeBill}
        >
          <Photograph color="#fff" size={18} />
          <Text className="self-integration__main-btn-text">拍票据得积分</Text>
        </Button>
      </View>

      {/* 底部导航 */}
      <View className="self-integration__footer">
        <View className="self-integration__footer-item" onClick={handleViewRules}>
          <Tips color="#666" size={12} />
          <Text className="self-integration__footer-text">积分规则</Text>
        </View>
        <View className="self-integration__footer-divider">|</View>
        <View className="self-integration__footer-item" onClick={handleViewRecords}>
          <Feedback color="#666" size={12} />
          <Text className="self-integration__footer-text">申请记录</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(SelfIntegration);