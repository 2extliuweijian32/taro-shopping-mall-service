import { View } from '@tarojs/components';
import React, { useState, useEffect } from 'react';
import './index.scss';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import FilterPopup from './components/FilterPopup';
import MerchantList from './components/MerchantList';
import { 
  Merchant, 
  FilterType, 
  SORT_OPTIONS, 
  FLOOR_OPTIONS, 
  CATEGORY_OPTIONS, 
  INIT_MERCHANTS 
} from './types';

const MerchantPage: React.FC = () => {
  // 状态管理
  const [searchValue, setSearchValue] = useState<string>(''); // 搜索关键词
  const [activeFilter, setActiveFilter] = useState<FilterType | ''>(''); // 当前激活的筛选类型
  const [popupVisible, setPopupVisible] = useState<boolean>(false); // 筛选弹窗是否显示
  const [selectedFloor, setSelectedFloor] = useState<string>('all'); // 选中的楼层值
  const [selectedCategory, setSelectedCategory] = useState<string>('all'); // 选中的分类值
  const [selectedSort, setSelectedSort] = useState<string>('default'); // 选中的排序值
  const [merchants, setMerchants] = useState<Merchant[]>(INIT_MERCHANTS); // 商户列表
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否有更多数据
  const [page, setPage] = useState<number>(1); // 当前页码

  // 获取选中筛选的文本
  const getFilterText = (type: FilterType) => {
    switch (type) {
      case 'floor':
        return FLOOR_OPTIONS.find(item => item.value === selectedFloor)?.label || '楼层';
      case 'category':
        return CATEGORY_OPTIONS.find(item => item.value === selectedCategory)?.label || '分类';
      case 'sort':
        return SORT_OPTIONS.find(item => item.value === selectedSort)?.label || '默认排序';
      default:
        return '';
    }
  };

  // 筛选弹窗切换
  const handleFilterClick = (type: FilterType) => {
    setActiveFilter(type);
    setPopupVisible(true);
  };

  // 筛选选项选择
  const handleFilterSelect = (type: FilterType, value: string) => {
    switch (type) {
      case 'floor':
        setSelectedFloor(value);
        break;
      case 'category':
        setSelectedCategory(value);
        break;
      case 'sort':
        setSelectedSort(value);
        break;
    }
    // 筛选后重置页码和列表
    setPage(1);
    filterMerchants();
  };

  // 筛选商户（搜索+楼层+分类+排序）
  const filterMerchants = () => {
    let filtered = [...INIT_MERCHANTS];
    
    // 搜索筛选
    if (searchValue) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    // 楼层筛选（模拟，实际需结合商户floor字段）
    if (selectedFloor !== 'all') {
      // 此处仅为示例，实际需根据商户真实楼层数据筛选
      filtered = filtered.filter((_, index) => index % 4 !== 0);
    }

    // 分类筛选（模拟，实际需结合商户category字段）
    if (selectedCategory !== 'all') {
      // 此处仅为示例，实际需根据商户真实分类数据筛选
      filtered = filtered.filter((_, index) => index % 3 !== 0);
    }

    // 排序筛选
    switch (selectedSort) {
      case 'like':
        filtered.sort(() => Math.random() - 0.5); // 模拟点赞排序
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name)); // 名称A-Z
        break;
      default:
        filtered = [...INIT_MERCHANTS]; // 默认排序
        break;
    }

    setMerchants(filtered);
    setHasMore(true);
  };

  // 滚动加载更多（模拟）
  const handleLoadMore = () => {
    setLoading(true);
    // 模拟接口请求延迟
    setTimeout(() => {
      const newPage = page + 1;
      setPage(newPage);
      // 模拟加载更多数据（仅前3页有数据）
      if (newPage <= 3) {
        const newMerchants = INIT_MERCHANTS.map(item => ({
          ...item,
          id: `${item.id}_${newPage}`
        }));
        setMerchants(prev => [...prev, ...newMerchants]);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 1000);
  };

  // 监听搜索值变化触发筛选
  useEffect(() => {
    const timer = setTimeout(() => {
      filterMerchants();
    }, 500); // 防抖
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <View className="merchant-page">
      {/* 搜索框 */}
      <SearchBar 
        value={searchValue} 
        onChange={setSearchValue} 
      />
      
      {/* 筛选栏 */}
      <FilterBar 
        activeFilter={activeFilter}
        floorText={getFilterText('floor')}
        categoryText={getFilterText('category')}
        sortText={getFilterText('sort')}
        onFilterClick={handleFilterClick}
      />
      
      {/* 商户列表 */}
      <MerchantList 
        merchants={merchants}
        loading={loading}
        hasMore={hasMore}
        onReachBottom={handleLoadMore}
      />
      
      {/* 筛选弹窗 */}
      <FilterPopup 
        visible={popupVisible}
        type={activeFilter as FilterType}
        options={
          activeFilter === 'floor' ? FLOOR_OPTIONS :
          activeFilter === 'category' ? CATEGORY_OPTIONS :
          SORT_OPTIONS
        }
        selectedValue={
          activeFilter === 'floor' ? selectedFloor :
          activeFilter === 'category' ? selectedCategory :
          selectedSort
        }
        onSelect={(value) => handleFilterSelect(activeFilter as FilterType, value)}
        onClose={() => setPopupVisible(false)}
      />
    </View>
  );
};

export default MerchantPage;