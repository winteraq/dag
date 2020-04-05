export type Node = {
  id: string;
  [key: string]: any;
  style?: any;
};
export type Edge = { start: string; end: string; style?: any; [key: string]: any };

export type GroupBy = {
  key: string;
  label: string;
};
