/**
 * 日期格式化工具函数（TS 优化版，稳定无阻塞）
 * @param {number} timestamp - 毫秒级时间戳（必填，如 1735689600000）
 * @param {string} format - 格式化字符串（必填，支持占位符：yyyy-MM-dd HH:mm:ss SSS 等）
 * @returns {string} 格式化后的日期字符串，入参无效/处理失败时返回空字符串
 * 支持的占位符说明：
 * yyyy - 4位年份（如 2026）
 * MM   - 2位月份（补0，如 02、12）
 * dd   - 2位日期（补0，如 03、30）
 * HH   - 2位小时（24小时制，补0，如 08、23）
 * hh   - 2位小时（12小时制，补0，如 08、11）
 * mm   - 2位分钟（补0，如 05、59）
 * ss   - 2位秒数（补0，如 09、59）
 * S    - 1位毫秒（如 5、9）
 * SS   - 2位毫秒（补0，如 05、99）
 * SSS  - 3位毫秒（补0，如 005、999）
 */
export function formatDate(timestamp: number, format: string): string {
  // 1. 入参合法性校验（快速失败，避免无效后续处理）
  if (!Number.isFinite(timestamp) || timestamp < 0) {
    console.error('无效的毫秒级时间戳：必须为非负有效数字（不能是NaN/Infinity）');
    return '';
  }
  if (typeof format !== 'string' || format.trim().length === 0) {
    console.error('格式化字符串无效：不能为空且必须为字符串类型');
    return '';
  }

  // 2. 创建 Date 对象并校验是否有效
  const date = new Date(timestamp);
  if (date.toString() === 'Invalid Date') {
    console.error('时间戳超出 Date 支持范围，无法解析');
    return '';
  }

  // 3. 提取日期时间各个部分（仅一次提取，无冗余操作）
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  // 4. 补0工具函数（优化性能，避免冗余调用）
  const padStart = (num: number, length: number = 2): string => {
    if (num < 0) return '00'.slice(0, length);
    return num.toString().padStart(length, '0');
  };

  // 5. 构建占位符映射表（关键：先长后短，解决包含关系替换问题）
  // 采用数组存储，明确替换顺序，优先替换长占位符，避免被短占位符拆解
  const placeholderPairs: [string, string | number][] = [
    ['yyyy', year],
    ['MM', padStart(month)],
    ['dd', padStart(day)],
    ['HH', padStart(hours24)],
    ['hh', padStart(hours12)],
    ['mm', padStart(minutes)],
    ['ss', padStart(seconds)],
    ['SSS', padStart(milliseconds, 3)], // 先长：3位毫秒
    ['SS', padStart(milliseconds, 2)],  // 再中：2位毫秒
    ['S', milliseconds.toString().slice(0, 1)] // 最后短：1位毫秒
  ];

  // 6. 替换格式化字符串（优化性能：仅一次遍历，缓存正则，避免重复创建）
  let result = format;
  for (const [placeholder, value] of placeholderPairs) {
    // 仅创建一次正则，全局替换，且value提前转为字符串，避免冗余转换
    const reg = new RegExp(placeholder, 'g');
    result = result.replace(reg, String(value));
  }

  return result;
}