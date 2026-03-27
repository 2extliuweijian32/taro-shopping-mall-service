import { View, Text } from '@tarojs/components';
import React from 'react';
import './index.scss';
import { FilterType } from '../../types';

interface FilterBarProps {
  activeFilter: FilterType | '';
  floorText: string;
  categoryText: string;
  sortText: string;
  onFilterClick: (type: FilterType) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, floorText, categoryText, sortText, onFilterClick }) => {
  return (
    <View className="filter-bar">
      <View 
        className={`filter-bar__item ${activeFilter === 'floor' ? 'filter-bar__item--active' : ''}`}
        onClick={() => onFilterClick('floor')}
      >
        <Text className="filter-bar__text">{floorText}</Text>
      </View>
      <View 
        className={`filter-bar__item ${activeFilter === 'category' ? 'filter-bar__item--active' : ''}`}
        onClick={() => onFilterClick('category')}
      >
        <Text className="filter-bar__text">{categoryText}</Text>
      </View>
      <View 
        className={`filter-bar__item ${activeFilter === 'sort' ? 'filter-bar__item--active' : ''}`}
        onClick={() => onFilterClick('sort')}
      >
        <Text className="filter-bar__text">{sortText}</Text>
      </View>
    </View>
  );
};

export default FilterBar;