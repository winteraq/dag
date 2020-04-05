import React from 'react';
import { Group, Path } from 'react-konva';
import { GraphEdge, Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { Node } from '../types';
import { getPathData } from '../util';
import { Arrow } from './arrows';

export const DagEdge: React.FC<{
  startNode: DNode<Node>;
  endNode: DNode<Node>;
  edge: GraphEdge;
}> = ({ startNode, endNode, edge }) => {
  const points = [
    { x: startNode.x + startNode.width / 2, y: startNode.y },
    ...edge.points.slice(1, -1),
    { x: endNode.x - endNode.width / 2, y: endNode.y },
  ];
  const endPoint = points[edge.points.length - 1],
    pts = points[edge.points.length - 2];
  const x = Math.abs(endPoint.x - pts.x);
  const y = Math.abs(endPoint.y - pts.y);
  // 斜边长
  const z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  // 弧度
  const radina =
    Math.abs(endPoint.x - pts.x) > Math.abs(endPoint.y - pts.y)
      ? Math.acos(x / z)
      : Math.asin(y / z);
  console.log(edge.points, endPoint, pts, radina);

  // 角度
  const angle = 180 / (Math.PI / radina);
  return (
    <Group>
      <Path data={getPathData(points)} stroke={getTheme().edgeColor} strokeWidth={2} />
      <Arrow angle={-angle} x={endPoint.x} y={endPoint.y - 5} />
    </Group>
  );
};
