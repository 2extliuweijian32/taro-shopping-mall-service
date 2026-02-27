import React, { FC, memo, useEffect, useState } from 'react';
import { View, Text, Input, ITouchEvent } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Del } from '@nutui/icons-react-taro'
import { formatDate } from '@/utils/date';
import CarPlateKeyboard, { KeyboardType } from '@/components/CarPlateKeyboard/CarPlateKeyboard';
import './index.scss';

enum CarPlateType {
  MAINLAND = 'mainland',
  HKMO = 'hkmo'
};

const STORAGE_KEY = 'CAR_PLATE';

interface CarPlateStorageInfo { 
  plate: string; 
  time: number;
  type: CarPlateType
}

function formatPlate(plate: string, type: CarPlateType) {
  return type === CarPlateType.HKMO ? plate : (plate.substring(0, 2) + '·' + plate.substring(2));
}

// 停车缴费页面组件
const CarPlateInput: FC = () => {
  // 车牌扩展为8个方格，适配新能源车牌
  const [mainlandPlate, setMainlandPlate] = useState<string[]>(new Array(8).fill(''));
  const [focusIndex, setFocusIndex] = useState<number>(-1);
  const [keyboardType, setKeyboardType] = useState<KeyboardType>(KeyboardType.PROVINCE);
  const [plateType, setPlateType] = useState<CarPlateType>(CarPlateType.MAINLAND);
  const [hkmoPlate, setHkmoPlate] = useState<string>('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const [historyList, setHistoryList] = useState<Array<CarPlateStorageInfo>>(() => {
    return Taro.getStorageSync(STORAGE_KEY) || [];
  });

  const isPaymentAllowable = plateType === CarPlateType.MAINLAND ? mainlandPlate.slice(0, 7).every(v => !!v) : !!hkmoPlate;

  const handlePlateClick = (index: number) => {
    setFocusIndex(index);
    setIsKeyboardVisible(true);
    setKeyboardType(index > 0 ? KeyboardType.CHAR : KeyboardType.PROVINCE);
  }

  const hideKeyboard = () => {
    setFocusIndex(-1);
    setIsKeyboardVisible(false);
  }

  const stopPropergation = (e: ITouchEvent) => {
    e.stopPropagation();
  }

  // 省份选择回调
  const handleProvinceSelect = (province: string) => {
    if (focusIndex !== 0) {
      return;
    }
    setMainlandPlate(plate => {
      return ([province]).concat(plate.slice(1))
    });
    setFocusIndex(1);
    setKeyboardType(KeyboardType.CHAR);
  };

  // 字符点击回调（适配8个方格）
  const handleCharClick = (char: string) => {
    if (focusIndex >= 0 && focusIndex < 8) { // 焦点范围扩展为0-7（8个方格）
      const newPlate = [...mainlandPlate];
      newPlate[focusIndex] = char;
      setMainlandPlate(newPlate);
      // 焦点后移，最多到第7位（索引从0开始）
      if (focusIndex < 7) {
        setFocusIndex(focusIndex + 1);
      }
    }
  };

  // 删除回调（适配8个方格）
  const handleDelete = () => {
    const newPlate = [...mainlandPlate];
    // 先清空当前焦点位，再前移焦点
    if (newPlate[focusIndex]) {
      newPlate[focusIndex] = '';
      setMainlandPlate(newPlate);
    } else if (focusIndex > 0) {
      setFocusIndex(focusIndex - 1);
      newPlate[focusIndex - 1] = '';
      setMainlandPlate(newPlate);
    }
    // 焦点回到0时，切换回省份键盘
    if (focusIndex === 0) {
      setKeyboardType(KeyboardType.PROVINCE);
    }
  };

  // 重置回调（适配8个方格）
  const handleReset = () => {
    setMainlandPlate(new Array(8).fill('')); // 重置为8位空数组
    setFocusIndex(0);
    setKeyboardType(KeyboardType.PROVINCE);
  };

  // 完成回调（适配8个方格，拼接分隔符）
  const handleComplete = () => {
    const isValidPlate = mainlandPlate.slice(0, 7).every(v => !!v);
    if (!isValidPlate) {
      Taro.showToast({ title: '请输入完整车牌', icon: 'none' });
      return;
    }
    hideKeyboard();
  };

  // 切换到字符键盘
  const handleKeyboardSwitch = () => {
    setKeyboardType(focusIndex > 0 ? KeyboardType.CHAR : KeyboardType.PROVINCE);
  };

  // 切换车牌类型
  const handleSwitchPlateType = (type: CarPlateType) => {
    if (type === plateType) {
      return;
    }
    setPlateType(type);
  };

  // 删除历史记录
  const handleDeleteHistory = (index: number) => {
    setHistoryList(h => h.filter((_, i) => i !== index));
  };

  const handleHistoryClick = (item: CarPlateStorageInfo) => {
    setPlateType(item.type);
    if (item.type === CarPlateType.HKMO) {
      setHkmoPlate(item.plate);
      return;
    }
    setMainlandPlate(item.plate.split(''));
  };

  const handlePay = () => {
    if (!isPaymentAllowable) {
      return;
    }

    const plate = plateType === CarPlateType.MAINLAND ? mainlandPlate.join('') : hkmoPlate;

    Taro.showToast({ title: `去付款吧: ${plate}` });

    setHistoryList(historyList => {
      const h = historyList.filter(v => v.plate !== plate);
      h.unshift({
        plate,
        time: Date.now(),
        type: plateType
      });
      return h;
    });
  }

  useEffect(() => {
    Taro.setStorageSync(STORAGE_KEY, historyList);
  }, [historyList]);

  return (
    <>
      <View className="car-plate-input" onClick={hideKeyboard}>

        {/* 车牌输入区域 */}
        <View className="car-plate-input__plate-section">
          <View className="car-plate-input__plate-title">请输入车牌号码</View>

          {/* 车牌类型切换 */}
          <View className="car-plate-input__type-switch">
            <View
              className={`car-plate-input__switch-btn ${plateType === 'mainland' ? 'car-plate-input__switch-btn--active' : ''}`}
              onClick={() => handleSwitchPlateType(CarPlateType.MAINLAND)}
            >
              <Text className="car-plate-input__switch-text">内地车牌</Text>
            </View>
            <View
              className={`car-plate-input__switch-btn ${plateType === 'hkmo' ? 'car-plate-input__switch-btn--active' : ''}`}
              onClick={() => handleSwitchPlateType(CarPlateType.HKMO)}
            >
              <Text className="car-plate-input__switch-text">港澳车牌</Text>
            </View>
          </View>

          {/* 内地车牌输入（8个方格 + 第二个方格后分隔符） */}
          {plateType === CarPlateType.MAINLAND && (
            <View className="car-plate-input__mainland-plate" onClick={stopPropergation}>
              {mainlandPlate.map((item, index) => (
                <React.Fragment key={index}>
                  {/* 车牌方格（8个） */}
                  <View
                    className={`car-plate-input__plate-grid 
                      ${index === focusIndex ? 'car-plate-input__plate-grid--focus' : ''} 
                      ${item === '' && index > 0 && index !== 7 ? 'car-plate-input__plate-grid--disabled' : ''} 
                      ${index === 7 ? 'car-plate-input__plate-grid--new-energy' : ''}`}
                    onClick={() => handlePlateClick(index)}
                  >
                    {/* 最后一个方格（新能源）特殊内容 */}
                    {index === 7 ? (
                      item ? (
                        <Text className="car-plate-input__grid-text">{item}</Text>
                      ) : (
                        <View className="car-plate-input__new-energy-content">
                          <Text className="car-plate-input__new-energy-plus">+</Text>
                          <Text className="car-plate-input__new-energy-text">新能源</Text>
                        </View>
                      )
                    ) : (
                      <Text className="car-plate-input__grid-text">{item || ''}</Text>
                    )}
                  </View>

                  {/* 第二个方格后添加分隔符（索引1之后，即第2个方格末尾） */}
                  {index === 1 && (
                    <View className="car-plate-input__plate-separator">
                      <Text className="car-plate-input__separator-text">·</Text>
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>
          )}

          {/* 港澳车牌输入 */}
          {plateType === CarPlateType.HKMO && (
            <View className="car-plate-input__hkmo-plate">
              <Input
                className="car-plate-input__hkmo-input"
                placeholder="请输入港澳车牌号码"
                placeholderClass="car-plate-input__hkmo-placeholder"
                value={hkmoPlate}
                onInput={(e) => setHkmoPlate(e.detail.value)}
              />
            </View>
          )}
        </View>

        {/* 历史记录区域 */}
        <View className="car-plate-input__history-section">
          <View className="car-plate-input__history-title">缴费历史</View>
          {historyList.length > 0 ? (
            <View className="car-plate-input__history-list">
              {historyList.map((item, index) => (
                <View key={index} className="car-plate-input__history-item">
                  <View className="car-plate-input__history-content" onClick={() => handleHistoryClick(item)}>
                    <Text className="car-plate-input__history-plate">{formatPlate(item.plate, item.type)}</Text>
                    <Text className="car-plate-input__history-time">{formatDate(item.time, 'yyyy-MM-dd HH:mm:ss')}</Text>
                  </View>
                  <View
                    className="car-plate-input__history-delete"
                    onClick={() => handleDeleteHistory(index)}
                  >
                    <Del className="car-plate-input__delete-icon" />
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="car-plate-input__history-empty">
              <Text className="car-plate-input__empty-text">暂无缴费记录</Text>
            </View>
          )}
        </View>

        {/* 缴费按钮 */}
        <View className="car-plate-input__btn-section">
          <View 
            className={isPaymentAllowable ? "car-plate-input__pay-btn" : 'car-plate-input__pay-btn car-plate-input__pay-btn--disabled'}
            onClick={handlePay}
          >
            <Text className="car-plate-input__pay-text">立即缴费</Text>
          </View>
        </View>
      </View>
      {/* 自定义键盘（传递第一个方格内容，适配8个方格） */}
      <CarPlateKeyboard
        visible={isKeyboardVisible}
        keyboardType={keyboardType}
        focusIndex={focusIndex}
        firstPlate={mainlandPlate[0]}
        onCharClick={handleCharClick}
        onProvinceSelect={handleProvinceSelect}
        onReset={handleReset}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onKeyboardSwitch={handleKeyboardSwitch}
      />
    </>
  );
};

export default memo(CarPlateInput);