import React from 'react';
import { Group, Path } from 'react-konva';
import { GraphEdge, Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { Node } from '../types';
import { getPathData } from '../util';
import { RingEdge } from './ringEdge';

export const DagEdge: React.FC<{
  startNode: DNode<Node>;
  endNode: DNode<Node>;
  edge: GraphEdge;
}> = ({ startNode, endNode, edge }) => {
  console.log('edge xxx', startNode, endNode);
  if (startNode.id === endNode.id) {
    const startPoint = {
      x: startNode.x,
      y: startNode.y + startNode.height / 2,
    };
    console.log(startPoint);
    // return null
    return <RingEdge direction={'bottom'} startPoint={startPoint} endPoint={startPoint} />;
  }
  const points = [
    { x: startNode.x + startNode.width / 2, y: startNode.y },
    ...edge.points.slice(1, -1),
    { x: endNode.x - endNode.width / 2, y: endNode.y },
  ];
  const startPoint = points[0],
    endPoint = points[edge.points.length - 1],
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
  console.log('edge', startNode, endNode, edge.points, points, radina);

  // 角度
  const angle = 180 / (Math.PI / radina);
  const color = getTheme().edgeColor;
  const { edgeWidth } = getTheme();
  const pathData =
    points.length <= 4
      ? `M ${startPoint.x} ${startPoint.y}
  C ${(startPoint.x + endPoint.x) / 2} ${startPoint.y},
    ${(startPoint.x + endPoint.x) / 2} ${endPoint.y},
    ${endPoint.x} ${endPoint.y}`
      : getPathData(points);

  return (
    <Group>
      {/*<Line*/}
      {/*  points={edge.points.map((item) => [item.x, item.y]).flat()}*/}
      {/*  stroke={'blue'}*/}
      {/*  strokeWidth={2}*/}
      {/*/>*/}
      {/*<Line points={points.map((item) => [item.x, item.y]).flat()} stroke={'red'} strokeWidth={2} />*/}
      <Path data={pathData} stroke={color} strokeWidth={edgeWidth} />
      <Group x={endPoint.x} y={endPoint.y}>
        <Path
          angle={-angle}
          data={'M 0 0 L -5 -2.5 L -5 2.5 z'}
          fill={color}
          strokeWidth={edgeWidth}
        />
      </Group>
    </Group>
  );
};
