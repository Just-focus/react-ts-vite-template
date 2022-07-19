/*
 * @Author: alex_chen
 * @Date: 2022-04-08 16:28:14
 * @LastEditors: alex_chen
 * @LastEditTime: 2022-04-27 19:40:36
 * @Description: css 配置
 */
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-preset-env': {},
    'autoprefixer': {},
    'cssnano': {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视口宽度（数字)
      viewportHeight: 812, // 视口高度（数字）
      unitPrecision: 3, // 设置的保留小数位数（数字）
      viewportUnit: 'vw', // 设置要转换的单位（字符串）
      fontViewportUnit: 'vw', // 设置字体转换的单位（字符串）
      selectorBlackList: ['.ignore'], // 不需要进行转换的类名（数组）
      minPixelValue: 1, // 设置要替换的最小像素值（数字）
      mediaQuery: false, // 允许在媒体查询中转换px（true/false）
    },
  },
};
