import React, { useMemo } from 'react';
import { Group, Path, Arrow } from 'react-konva';
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
  activeNode?: Node;
}> = ({ startNode, endNode, edge, type }) => {
  const edgeColor = getTheme(`${edge.$state$}edgeColor`);
  // console.log('edge xxx', startNode, endNode, edge);
  // 自包含环形边
  if (startNode.id === endNode.id) {
    const startPoint = {
      x: startNode.x,
      y: startNode.y + startNode.height / 2,
    };
    return (
      <RingEdge
        edgeColor={edgeColor}
        direction={'bottom'}
        startPoint={startPoint}
        endPoint={startPoint}
      />
    );
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
    pts =
      points.length <= 4
        ? { x: (startPoint.x + endPoint.x) / 2, y: endPoint.y }
        : points[edge.points.length - 2];
  const { edgeWidth } = getTheme();
  // const pathData =
  //   points.length <= 4
  //     ? `M ${startPoint.x} ${startPoint.y}
  // C ${(startPoint.x + endPoint.x) / 2} ${startPoint.y},
  //   ${pts.x} ${pts.y},
  //   ${endPoint.x} ${endPoint.y}`
  //     : getPathData(points);
  const angle = useMemo(() => {
    const radina = Math.atan2(endPoint.y - pts.y, endPoint.x - pts.x);
    const angle = (radina * 180) / Math.PI;
    return angle;
  }, [endPoint.x, endPoint.y, pts.y, pts.x]);
  // console.log('angle', angle, startNode, endNode, pts, endPoint);
  return (
    <Group listening={false}>
      {points.length <= 4 ? (
        <Arrow
          listening={false}
          points={[
            startPoint.x,
            startPoint.y,
            (startPoint.x + endPoint.x) / 2,
            startPoint.y,
            pts.x,
            pts.y,
            endPoint.x,
            endPoint.y,
          ]}
          pointerWidth={3}
          pointerLength={3}
          bezier={true}
          stroke={edgeColor}
          strokeWidth={1.5}
        />
      ) : (
        <>
          <Path data={getPathData(points)} stroke={edgeColor} strokeWidth={edgeWidth} />
          <Group x={endPoint.x} y={endPoint.y}>
            <Path
              rotation={angle}
              data={'M 0 0 L -5 -2.5 L -5 2.5 z'}
              fill={edgeColor}
              strokeWidth={edgeWidth}
            />
          </Group>
        </>
      )}
      {/*<Line points={points.map((item) => [item.x, item.y]).flat()} stroke={'red'} strokeWidth={2} />*/}
      {/*<Path data={pathData} stroke={edgeColor} strokeWidth={edgeWidth} />*/}
      {/*<Group x={endPoint.x} y={endPoint.y}>*/}
      {/*  <Path*/}
      {/*    rotation={-angle}*/}
      {/*    data={'M 0 0 L -5 -2.5 L -5 2.5 z'}*/}
      {/*    fill={edgeColor}*/}
      {/*    strokeWidth={edgeWidth}*/}
      {/*  />*/}
      {/*</Group>*/}
    </Group>
  );
};
