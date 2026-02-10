import React, { FC, memo } from 'react';
import { View, Text } from '@tarojs/components';
import './CarPlateKeyboard.scss';

// 省份简称列表（包含：学、港、澳，前三行每行10个，第四行6个省份+ABC左+删除右）
export const PROVINCE_LIST = [
  '京', '沪', '粤', '苏', '浙', '鲁', '川', '渝', '湘', '鄂', // 第1行：10个
  '皖', '闽', '赣', '津', '冀', '晋', '蒙', '辽', '吉', '黑', // 第2行：10个
  '豫', '桂', '琼', '黔', '云', '藏', '陕', '甘', '青', '宁', // 第3行：10个
  '新', '使', '领', '警', '学', '港', '澳' // 第4行：7个省份（含学、港、澳）
];

// 真实键盘布局：分为4行，第四行末尾预留地区/删除按钮位置
export const CHAR_GRID = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], // 第1行：数字
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], // 第2行：字母Q-P（包含I、O）
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],     // 第3行：字母A-L（9个）
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M']                 // 第4行：字母Z-M（7个）+ 地区/删除
];

export enum KeyboardType {
  CHAR = 'char',
  PROVINCE = 'province'
};

// 键盘组件Props接口（新增firstPlate：第一个方格内容，用于判断O的禁用逻辑）
interface CarPlateKeyboardProps {
  keyboardType: KeyboardType;
  focusIndex: number;
  visible: boolean;
  firstPlate: string; // 第一个方格（省份）的内容
  onCharClick: (char: string) => void;
  onProvinceSelect: (province: string) => void;
  onReset: () => void;
  onComplete: () => void;
  onDelete: () => void;
  onKeyboardSwitch: () => void;
}

// 自定义车牌键盘组件
const CarPlateKeyboard: FC<CarPlateKeyboardProps> = ({
  visible,
  keyboardType,
  focusIndex,
  firstPlate,
  onCharClick,
  onProvinceSelect,
  onReset,
  onComplete,
  onDelete,
  onKeyboardSwitch
}) => {
  // 省份列表切片（前三行每行10个，第四行6个省份（含学、港、澳））
  const provinceRows = [
    PROVINCE_LIST.slice(0, 10),
    PROVINCE_LIST.slice(10, 20),
    PROVINCE_LIST.slice(20, 30),
    PROVINCE_LIST.slice(30, 36)
  ];

  // 核心：判断字符是否可点击（禁用I + 条件禁用O）
  const isCharClickable = (char: string): boolean => {
    // 1. 全局禁用I
    if (char === 'I') return false;

    // 2. 条件禁用O：焦点在第二个方格（索引1）且第一个方格不是粤
    if (char === 'O') {
      return !(focusIndex === 1 && firstPlate !== '粤');
    }

    // 其他字符正常可点击
    return true;
  };

  // 字符点击包装函数（拦截禁用字符）
  const handleCharClickWrapper = (char: string) => {
    if (isCharClickable(char)) {
      onCharClick(char);
    }
  };

  return (
    <View className={visible ? 'car-plate-keyboard' : 'car-plate-keyboard--hidden'}>
      {/* 键盘头部 - 重置 + 完成 */}
      <View className="car-plate-keyboard__header">
        <View
          className="car-plate-keyboard__reset"
          onClick={onReset}
        >
          <Text className="car-plate-keyboard__reset-text">重置</Text>
        </View>
        <View
          className="car-plate-keyboard__complete"
          onClick={onComplete}
        >
          <Text className="car-plate-keyboard__complete-text">完成</Text>
        </View>
      </View>

      {/* 省份面板（前三行每行10个，第四行6省+ABC左+删除右） */}
      {keyboardType === 'province' && (
        <View className="car-plate-keyboard__province">
          {provinceRows.slice(0, 3).map((row, rowIndex) => (
            <View key={rowIndex} className="car-plate-keyboard__province-row car-plate-keyboard__province-row--normal">
              {row.map((province, colIndex) => (
                <View
                  key={colIndex}
                  className="car-plate-keyboard__province-item"
                  onClick={() => onProvinceSelect(province)}
                >
                  <Text className="car-plate-keyboard__province-text">{province}</Text>
                </View>
              ))}
            </View>
          ))}

          {/* 第4行：6省 + ABC左 + 删除右，平分剩余空间 */}
          <View className="car-plate-keyboard__province-row car-plate-keyboard__province-row--fourth">
            <View
              className="car-plate-keyboard__province-btn car-plate-keyboard__province-btn--left abc"
              onClick={onKeyboardSwitch}
            >
              <Text className="car-plate-keyboard__province-btn-text">ABC</Text>
            </View>

            {provinceRows[3].map((province, colIndex) => (
              <View
                key={colIndex}
                className="car-plate-keyboard__province-item"
                onClick={() => onProvinceSelect(province)}
              >
                <Text className="car-plate-keyboard__province-text">{province}</Text>
              </View>
            ))}

            <View
              className="car-plate-keyboard__province-btn car-plate-keyboard__province-btn--right delete"
              onClick={onDelete}
            >
              <Text className="car-plate-keyboard__province-btn-text">删除</Text>
            </View>
          </View>
        </View>
      )}

      {/* 字母数字面板（真实键盘布局，第四行整合地区/删除） */}
      {keyboardType === 'char' && (
        <View className="car-plate-keyboard__char">
          {/* 遍历真实键盘前3行 */}
          {CHAR_GRID.slice(0, 3).map((row, rowIndex) => (
            <View key={rowIndex} className={`car-plate-keyboard__char-row car-plate-keyboard__char-row--${rowIndex + 1}`}>
              {row.map((char, colIndex) => (
                <View
                  key={colIndex}
                  className={`car-plate-keyboard__char-item ${!isCharClickable(char) ? 'car-plate-keyboard__char-item--disabled' : ''}`}
                  onClick={() => handleCharClickWrapper(char)}
                >
                  <Text className="car-plate-keyboard__char-text">{char}</Text>
                </View>
              ))}
            </View>
          ))}

          {/* 第4行：字母Z-M + 地区 + 删除（整合到同一行） */}
          <View className="car-plate-keyboard__char-row car-plate-keyboard__char-row--4">
            {/* 地区按钮（整合到第四行） */}
            <View
              className="car-plate-keyboard__char-btn car-plate-keyboard__char-btn--area"
              onClick={onKeyboardSwitch}
            >
              <Text className="car-plate-keyboard__char-btn-text">地区</Text>
            </View>

            {/* 字母Z-M */}
            {CHAR_GRID[3].map((char, colIndex) => (
              <View
                key={colIndex}
                className={`car-plate-keyboard__char-item ${!isCharClickable(char) ? 'car-plate-keyboard__char-item--disabled' : ''}`}
                onClick={() => handleCharClickWrapper(char)}
              >
                <Text className="car-plate-keyboard__char-text">{char}</Text>
              </View>
            ))}

            {/* 删除按钮（整合到第四行） */}
            <View
              className="car-plate-keyboard__char-btn car-plate-keyboard__char-btn--delete"
              onClick={onDelete}
            >
              <Text className="car-plate-keyboard__char-btn-text">删除</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(CarPlateKeyboard);