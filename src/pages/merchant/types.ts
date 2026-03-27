// 商户信息类型
export interface Merchant {
  id: string;
  name: string;
  icon: string;
  floor?: string; // 所属楼层
  category?: string; // 所属分类
  likeCount?: number; // 点赞数
  hasDiscount?: boolean; // 是否有优惠
  hasGroup?: boolean; // 是否有团购
  hasActivity?: boolean; // 是否有活动
}

// 筛选类型
export type FilterType = 'floor' | 'category' | 'sort';

// 筛选选项类型
export interface FilterOption {
  label: string;
  value: string;
}

// 排序选项
export const SORT_OPTIONS: FilterOption[] = [
  { label: '默认排序', value: 'default' },
  { label: '点赞最多', value: 'like' },
  { label: '优惠优先', value: 'discount' },
  { label: '团购优先', value: 'group' },
  { label: '活动优先', value: 'activity' },
  { label: '名称A~Z', value: 'name' },
];

// 楼层选项
export const FLOOR_OPTIONS: FilterOption[] = [
  { label: '全部', value: 'all' },
  { label: '主楼', value: 'main' },
  { label: 'L04', value: 'L04' },
  { label: 'L03', value: 'L03' },
  { label: 'L02', value: 'L02' },
];

// 分类选项
export const CATEGORY_OPTIONS: FilterOption[] = [
  { label: '全部', value: 'all' },
  { label: '配套', value: 'support' },
  { label: '餐饮', value: 'food' },
  { label: '零售', value: 'retail' },
];

// 初始模拟商户数据
export const INIT_MERCHANTS: Merchant[] = [
  { id: '1', name: '7-ELEVEN', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/7-ELEVEN' },
  { id: '2', name: 'abit', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/abit' },
  { id: '3', name: '爱碗亭', icon: 'https://placeholder.pics/svg/80x80/FF0000/FFFFFF/爱碗亭' },
  { id: '4', name: 'AnAnVintage', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/AnAnVintage' },
  { id: '5', name: '八合里', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/八合里' },
  { id: '6', name: '百果园', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/百果园' },
  { id: '7', name: '拌粉君', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/拌粉君' },
  { id: '8', name: '煲珠公', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/煲珠公' },
  { id: '9', name: '博士眼镜', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/博士眼镜' },
  { id: '10', name: '巢天椒', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/巢天椒' },
  { id: '11', name: '承航酒业', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/承航酒业' },
  { id: '12', name: '陈香贵兰州牛肉面', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/陈香贵' },
  { id: '13', name: 'CHEROOT', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/CHEROOT' },
  { id: '14', name: '春熙台韩料小食堂', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/春熙台' },
  { id: '15', name: 'Cotti Coffee', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/Cotti' },
  { id: '16', name: '搭搭碗', icon: 'https://placeholder.pics/svg/80x80/EEEEEE/999999/搭搭碗' },
];