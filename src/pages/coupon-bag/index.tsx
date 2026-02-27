import React, { FC, memo, useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, Image, ScrollView, CommonEventFunction, InputProps } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Picker, Input, PickerOptions, PickerValue } from '@nutui/nutui-react-taro';
import { ArrowDown, Search } from '@nutui/icons-react-taro';
import './index.scss';

// 枚举定义
enum CouponTab {
  Available = '可用券',
  History = '历史券'
}

enum CouponType {
  All = '所有券',
  Discount = '折扣券',
  Exchange = '兑换券',
  Coupon = '优惠券'
}

// 券数据类型
interface CouponItem {
  id: string;
  logo: string;
  title: string;
  desc: string;
  status: '已过期' | '可用';
  type: CouponType;
}

const couponTypePickerData = [
  [
    {
    label: CouponType.All,
    value: CouponType.All
    },
    {
    label: CouponType.Discount,
    value: CouponType.Discount
    },
    {
    label: CouponType.Exchange,
    value: CouponType.Exchange
    },
    {
    label: CouponType.Coupon,
    value: CouponType.Coupon
    }
  ]
];

// 模拟数据
const rawCouponData: CouponItem[] = (() => {
  // 准备模板数据，保证多样性
  const brands = ['卓悦INTOWN', '卓悦汇', '万象城', '来福士', '海岸城', '天虹', '茂业', '星河COCO', '益田假日', '海雅缤纷城'];
  const products = ['美妆', '服装', '餐饮', '数码', '母婴', '家居', '珠宝', '运动', '箱包', '护肤'];
  const couponTitles = [
    '【新会员】%s %d元券',
    '【%s】%s 专属福利券',
    '【%s】%s 满减券',
    '【会员专享】%s %d元无门槛券',
    '【限时福利】%s %s 兑换券'
  ];
  const couponDescs = ['满100元可用', '满200元可用', '满500元可用', '满1000元可用', '全场通用', '指定商品可用', ''];
  const couponTypes = [CouponType.Discount, CouponType.Exchange, CouponType.Coupon];
  const couponStatuses = ['已过期', '可用'];

  const data: CouponItem[] = [];
  for (let i = 1; i <= 100; i++) {
    // 随机选取模板数据
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomTitleTemplate = couponTitles[Math.floor(Math.random() * couponTitles.length)];
    const randomDesc = couponDescs[Math.floor(Math.random() * couponDescs.length)];
    const randomType = couponTypes[Math.floor(Math.random() * couponTypes.length)];
    const randomStatus = couponStatuses[Math.floor(Math.random() * 10) < 4 ? 1 : 0]; // 4:6 比例（可用:已过期）
    const randomAmount = [20, 50, 100, 200, 500][Math.floor(Math.random() * 5)];

    // 构造标题
    let title = randomTitleTemplate;
    title = title.replace('%s', randomBrand).replace('%s', randomProduct).replace('%d', randomAmount.toString());

    // 构造 logo 占位图（按类型区分颜色）
    let logoColor = 'FFF/000';
    if (randomType === CouponType.Discount) logoColor = '000/FFF';
    if (randomType === CouponType.Exchange) logoColor = 'F5F/00F';
    const logo = `https://placeholder.pics/svg/60x60/${logoColor}/${randomProduct}`;

    // 推入数据数组
    data.push({
      id: i.toString(),
      logo,
      title,
      desc: randomDesc,
      status: randomStatus as '已过期' | '可用',
      type: randomType
    });
  }
  return data;
  })();

const PAGE_SIZE = 20;

const CouponBag: FC = () => {
  // 1. 基础状态管理
  const [activeCouponType, setActiveCouponType] = useState<CouponType>(CouponType.All);
  const [activeCouponTab, setActiveCouponTab] = useState<CouponTab>(CouponTab.History);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [kw, setKw] = useState<string>('');
  const [pikerVisible, setPickerVisible] = useState<boolean>(false);
  
  // 2. 滚动到底部刷新（上拉加载）相关状态
  const [loading, setLoading] = useState<boolean>(false); // 加载中状态
  const [hasMore, setHasMore] = useState<boolean>(true); // 是否还有更多数据
  const helperRef = useRef<{ page: number }>({ page: 1 });

  const pickerValue = useMemo(() => [activeCouponType], [activeCouponType]);


  // 4. 核心：筛选并分页渲染列表（根据当前标签 + 当前券类型 + 页码）
  const filterAndPageCouponList = (params: {
    page?: number;
    couponTab?: CouponTab;
    couponType?: CouponType;
    keyword?: string;
  }) => {
    const {
      page = helperRef.current.page,
      couponTab = activeCouponTab,
      couponType = activeCouponType,
      keyword = kw
    } = params;
    let filteredList = rawCouponData;

    // 第一步：按标签筛选（可用券/历史券）
    if (couponTab === CouponTab.Available) {
      filteredList = filteredList.filter(item => item.status === '可用');
    } else if (couponTab === CouponTab.History) {
      filteredList = filteredList.filter(item => item.status === '已过期');
    }

    // 第二步：按券类型筛选（所有券/折扣券/兑换券/优惠券）
    if (couponType !== CouponType.All) {
      filteredList = filteredList.filter(item => item.type === couponType);
    }

    if (keyword) {
      filteredList = filteredList.filter(item => item.title.includes(keyword));
    }

    // 第三步：分页处理（截取当前页数据）
    const total = filteredList.length;
    const pageData = filteredList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    // 更新状态：是否还有更多数据
    setHasMore(page * PAGE_SIZE < total);

    // 第一页直接替换列表，后续页追加列表（分页加载逻辑）
    if (page === 1) {
      setCoupons(pageData);
    } else {
      setCoupons(prev => [...prev, ...pageData]);
    }

    helperRef.current.page = page;
  };

  const onKwSearch: CommonEventFunction<InputProps.inputValueEventDetail> = (e) => {
    filterAndPageCouponList({keyword: e.detail.value, page: 1});
  }

  // 5. 核心：滚动到底部触发刷新（上拉加载）
  const onScrollToLower = async () => {
    // 防止重复加载：加载中 / 无更多数据 时不触发
    if (loading || !hasMore) return;

    setLoading(true);
    // 模拟接口请求延迟（1.5 秒）
    await new Promise(resolve => setTimeout(resolve, 1500));

    filterAndPageCouponList({ page: helperRef.current.page + 1 });

    setLoading(false);
  };

  // 6. 切换标签（可用券/历史券）- 重置页码，重新加载列表
  const handleSwitchTab = (couponTab: CouponTab) => {
    setActiveCouponTab(couponTab);
    filterAndPageCouponList({ page: 1, couponTab });
  };

  // 7. NutPicker 选择完毕回调 - 重置页码，重新加载列表
  const handlePickerChange = (selectedOptions: PickerOptions, selectedValue: PickerValue[]) => {
    const couponType = selectedValue[0] as CouponType;
    setActiveCouponType(couponType);
    filterAndPageCouponList({ page: 1, couponType });
  };

  // 8. 组件挂载 + 页码变化时，初始化/更新列表
  useEffect(() => {
    filterAndPageCouponList({});
  }, []);

  return (
    <View className="coupon-bag">
      {/* 搜索栏 */}
      <View className="coupon-bag__search">
        <Input
          className="coupon-bag__search-input"
          placeholder=""
          value={kw}
          onChange={setKw}
          onClear={setKw}
          onConfirm={onKwSearch}
          confirmType="search"
          style={{ '--nutui-input-background-color': '#f5f5f5' }}
        />
        {!kw && (
          <View className="coupon-bag__search-input-placeholder">
            <Search size={14} color="#999"/>
            <Text>搜索我的券</Text>
          </View>
        )}
      </View>

      {/* 筛选栏 */}
      <View className="coupon-bag__filter-bar">
        <View className="coupon-bag__picker-trigger" onClick={() => setPickerVisible(true)}>
          <Text>
            {activeCouponType}
          </Text>
          <ArrowDown size={14} color="#333" />
        </View>
        <Picker
          value={pickerValue}
          visible={pikerVisible}
          options={couponTypePickerData}
          title="请选择优惠券类型"
          onClose={() => setPickerVisible(false)}
          onConfirm={handlePickerChange}
        />

        <View className="coupon-bag__filter-tabs">
          <Text
            className={`coupon-bag__filter-tab ${activeCouponTab === CouponTab.Available ? 'coupon-bag__filter-tab--active' : ''}`}
            onClick={() => handleSwitchTab(CouponTab.Available)}
          >
            {CouponTab.Available}
          </Text>
          <Text
            className={`coupon-bag__filter-tab ${activeCouponTab === CouponTab.History ? 'coupon-bag__filter-tab--active' : ''}`}
            onClick={() => handleSwitchTab(CouponTab.History)}
          >
            {CouponTab.History}
          </Text>
        </View>
      </View>

      {/* 订阅提示 */}
      <View className="coupon-bag__subscribe">
        <Text className="coupon-bag__subscribe-text">订阅券提醒消息通知，及时查收消息</Text>
        <View className="coupon-bag__subscribe-btn" onClick={() => Taro.showToast({ title: '已订阅', icon: 'none' })}>
          去订阅
        </View>
      </View>

      <View className="coupon-bag__scroller-wrapper">
        {/* 券列表（ScrollView 实现滚动到底部刷新） */}
        <ScrollView
          className="coupon-bag__scroller"
          scrollY
          onScrollToLower={onScrollToLower} // 滚动到底部触发事件
          lowerThreshold={200} // 距离底部50px时触发（可调整）
        >
          <View className="coupon-bag__list">
            {
              coupons.map((item) => (
                <View 
                  key={item.id} 
                  className="coupon-bag__item" 
                  onClick={() => {
                    Taro.navigateTo({ url: '/pages/coupon-detail/index' })
                  }}
                >
                  <Image className="coupon-bag__item-logo" src={item.logo} mode="aspectFit" />
                  <View className="coupon-bag__item-info">
                    <Text className="coupon-bag__item-title">{item.title}</Text>
                    {item.desc && <Text className="coupon-bag__item-desc">{item.desc}</Text>}
                  </View>
                  <Text className="coupon-bag__item-status">{item.status}</Text>
                </View>
              ))
            }
          </View>

          {/* 滚动到底部加载提示 */}
          <View className="coupon-bag__load-tips">
            {loading && <Text className="coupon-bag__load-text">加载中...</Text>}
            {!loading && !hasMore && <Text className="coupon-bag__load-text">暂无更多券</Text>}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default memo(CouponBag);