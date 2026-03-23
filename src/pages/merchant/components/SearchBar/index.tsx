import { View, Input } from '@tarojs/components';
import React from 'react';
import './index.scss';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = '输入商户关键字搜索' }) => {
  return (
    <View className="search-bar">
      <Input
        className="search-bar__input"
        value={value}
        onInput={(e) => onChange(e.detail.value)}
        placeholder={placeholder}
        placeholderStyle="color: #999; font-size: 12px;"
      />
    </View>
  );
};

export default SearchBar;