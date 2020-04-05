import React, { useMemo } from 'react';
import { Group, Path } from 'react-konva';
import { GraphEdge, Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { Node } from '../types';
import { getPathData } from '../util';
import { RingEdge } from './ringEdge';

function getPoints(startNode: DNode<Node>, endNode: DNode<Node>, edge: GraphEdge, type: string) {
  if (type === 'column') {
    // 先遍历的边，所有边上都会新增一个 $columnMap$ 属性做col的 map
    //   start: '1',
    //   end: '5',
    //   startCol: '2',
    //   endCol: '1',
    const startCol = startNode.$columnMap$[edge.startCol],
      endCol = endNode.$columnMap$[edge.endCol];
    const { nodeHeight } = getTheme();
    return [
      {
        x: startNode.x + startNode.width / 2,
        y: startNode.y - startNode.height / 2 + nodeHeight * (startCol.index + 0.5),
      },
      ...edge.points.slice(1, -1),
      {
        x: endNode.x - endNode.width / 2,
        y: endNode.y - endNode.height / 2 + nodeHeight * (endCol.index + 0.5),
      },
    ];
  }
  return [
    { x: startNode.x + startNode.width / 2, y: startNode.y },
    ...edge.points.slice(1, -1),
    { x: endNode.x - endNode.width / 2, y: endNode.y },
  ];
}

export const DagEdge: React.FC<{
  startNode: DNode<Node>;
  endNode: DNode<Node>;
  edge: GraphEdge;
  type: string;
}> = ({ startNode, endNode, edge, type }) => {
  console.log('edge xxx', startNode, endNode, edge);
  // 自包含环形边
  if (startNode.id === endNode.id) {
    const startPoint = {
      x: startNode.x,
      y: startNode.y + startNode.height / 2,
    };
    return <RingEdge direction={'bottom'} startPoint={startPoint} endPoint={startPoint} />;
  }
  const points = useMemo(() => getPoints(startNode, endNode, edge, type), [
    startNode.y,
    startNode.x,
    endNode.x,
    endNode.y,
    JSON.stringify(edge.points),
    type,
  ]);
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
  // console.log('edge', startNode, endNode, edge.points, points, radina);

  // 角度
  const angle = 180 / (Math.PI / radina);
  const { edgeWidth, edgeColor } = getTheme();
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
      <Path data={pathData} stroke={edgeColor} strokeWidth={edgeWidth} />
      <Group x={endPoint.x} y={endPoint.y}>
        <Path
          rotation={angle}
          data={'M 0 0 L -5 -2.5 L -5 2.5 z'}
          fill={edgeColor}
          strokeWidth={edgeWidth}
        />
      </Group>
    </Group>
  );
};
