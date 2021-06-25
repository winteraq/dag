let _theme = {
  nodeWidth: 158,
  nodeHeight: 28,
  nodeHighlightBorder: '#004ac9',
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
  searchBg: '#ffe95b',
  searchColor: '#282f38',
  groupBorder: '#4660ef',
  groupBg: '#4660ef',
  groupColor: '#ffffff',
  edgeColor: '#9a9a9a',
  edgeWidth: 1.5,
  disableedgeColor: '#ececec',
  activeNodeColor: '#416eff',
  fontFamily: 'Ubuntu Mono, Tahoma',
  hoverBg: '#f5f6fa',
  nodeDot: {
    hive: '#33d6cc',
    clickhouse: '#ffbc0a',
    topic: '#ed55b0',
    abase: '#33d6cc',
    byte: '#8a77ed',
    hdfs: '#5dcd81',
    mysql: '#f25c61',
    redis: '#34adf0',
    tableau: '#ffbc0a',
    druid: '#ed55b0',
    es: '#8a77ed',
    abtest: '#f25c61',
    unknown: '#33d6cc',
    hiveColumn: '#34adf0',
    hivePartition: '#5dcd81',
    abaseField: '#ffbc0a',
    redisField: '#ed55b0',
    esField: '#34adf0',
    Metric: '#33d6cc',
    TaskStdout: '#8a77ed',
    TaskStdoutField: '#34adf0',
    LogHouseEndpoint: '#5dcd81',
    LogHouseField: '#f25c61',
    ByteTable: '#33d6cc',
    ByteTableColumn: '#ffbc0a',
    RPCEndpoint: '#ed55b0',
    RPCField: '#8a77ed',
    ByteSQLTable: '#34adf0',
    ByteSQLColumn: '#5dcd81',
    DorisTable: '#f25c61',
    DorisColumn: '#ffbc0a',
    FaasEndpoint: '#ed55b0',
    FaasField: '#34adf0',
    BmqField: '#f25c61',
    RocketmqTopic: '#33d6cc',
    RocketmqField: '#ffbc0a',
    ClickhouseColumn: '#ed55b0',
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
