import { View, Text } from '@tarojs/components';
import React from 'react';
import './index.scss';
import { FilterOption } from '../../types';

interface FilterPopupProps {
  visible: boolean;
  type: 'floor' | 'category' | 'sort';
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({ visible, type, options, selectedValue, onSelect, onClose }) => {
  if (!visible) return null;

  return (
    <View className="filter-popup" onClick={onClose}>
      <View className="filter-popup__content" onClick={(e) => e.stopPropagation()}>
        {options.map((item) => (
          <Text
            key={item.value}
            className={`filter-popup__item ${selectedValue === item.value ? 'filter-popup__item--active' : ''}`}
            onClick={() => {
              onSelect(item.value);
              onClose();
            }}
          >
            {item.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default FilterPopup;