let _theme = {
  nodeWidth: 158,
  nodeHeight: 28,
  halfNodeWidth: 79,
  halfNodeHeight: 14,
  nodeBorderRadio: [2, 2, 2, 2],
  primaryColor: '#ffffff',
  primaryColumnColor: '#606a78',
  primaryBorder: '#4660ef',
  primaryBg: '#4660ef',
  primaryBorderRadio: [2, 2, 2, 2],
  secondaryColor: '#282f38',
  secondaryColumnColor: '#606a78',
  secondaryBg: '#ffffff',
  secondaryBorder: '#8b9dff',
  secondaryBorderRadio: [2, 2, 2, 2],
  disableColor: '#ffffff',
  disableColumnColor: '#939aa3',
  disableBg: '#c3c8cd',
  disableBorder: '#f5f6fa',
  disableBorderRadio: [2, 2, 2, 2],
  activeColor: '#416eff',
  activeColumnColor: '#416eff',
  activeBg: '#ffffff',
  activeBorder: '#8b9dff',
  activeBorderRadio: [2, 2, 2, 2],
  groupBorder: '#4660ef',
  groupBg: '#4660ef',
  groupColor: '#ffffff',
  edgeColor: '#a8b6c7',
  edgeWidth: 1.5,
  disableedgeColor: '#d5dadf',
  activeNodeColor: '#416eff',
  nodeDot: {
    hive: '#33d6cc',
    clickhouse: '#f5f6fa',
    mysql: '#8a77ed',
    kafka: '#34adf0',
    hdfs: '#5dcd81',
    druid: '#ed55b0',
    abase: '#33d6cc',
    tableau: '#ffbc0a',
    abtest: '#8a77ed',
    redis: '#34adf0',
    undefined: '#f25c61',
  },
};

export type themeType<T> = {
  [key in keyof T]?: T[key];
};

export const mergeTheme = (theme: themeType<typeof _theme>) => {
  _theme = Object.assign(_theme, theme);
};

export const getTheme = (key?: string) => {
  if (key) {
    return _theme[key];
  }
  return _theme;
};
