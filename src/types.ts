import Konva from 'konva';
import { Node as DNode } from 'dagre';

export type Node = {
  id: string;
  label: string;
  [key: string]: any;
  style?: any;
  columns?: any[];
};
export type Edge = { start: string; end: string; style?: any; [key: string]: any };

export type GroupBy = {
  key: string;
  label: string;
};

export type onNodeClick = (
  evt: Konva.KonvaEventObject<MouseEvent>,
  node: DNode<Node>,
  column?: Node
) => void;
export type NodeAttr = (
  node: DNode<Node>
) => {
  highLight?: boolean;
};
export type onNodeContextMenu = (
  evt: Konva.KonvaEventObject<PointerEvent>,
  node: DNode<Node>,
  pos?: { x: number; y: number },
  stage?: Konva.Stage
) => void;
export type onNodeHover = (
  node: DNode<Node>,
  pos?: { x: number; y: number },
  stage?: Konva.Stage,
  col?: DNode<Node>,
  index?: number
) => void;
export type onNodeOutHover = (node: DNode<Node>) => void;
export type Point = {
  x: number;
  y: number;
};

export type ActiveNode = { id: string; columnId?: string };
