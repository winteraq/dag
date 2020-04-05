import { Group, Path } from 'react-konva';
import React from 'react';
import { Point } from '../types';
import { getTheme } from '../theme';

export const RingEdge: React.FC<{
  startPoint: Point;
  endPoint: Point;
  direction: string;
  edgeColor?: string;
}> = function ({ startPoint, endPoint, direction, edgeColor }) {
  // 控制点
  let ctp1 = '',
    ctp2 = '';
  if (direction === 'top') {
    ctp1 = `${startPoint.x - 80} ${startPoint.y - 40}`;
    ctp2 = `${startPoint.x + 80} ${startPoint.y - 40}`;
  } else if (direction === 'bottom') {
    ctp1 = `${startPoint.x - 80} ${startPoint.y + 40}`;
    ctp2 = `${startPoint.x + 80} ${startPoint.y + 40}`;
  } else if (direction === 'right') {
    ctp1 = `${startPoint.x + 40} ${startPoint.y + 80}`;
    ctp2 = `${endPoint.x + 40} ${endPoint.y - 80}`;
  } else {
    ctp1 = `${startPoint.x - 40} ${startPoint.y + 80}`;
    ctp2 = `${endPoint.x + 40} ${endPoint.y - 80}`;
  }
  const { edgeWidth } = getTheme();
  return (
    <Group>
      <Path
        data={`M${startPoint.x} ${startPoint.y} C${ctp1} ${ctp2} ${endPoint.x} ${endPoint.y}`}
        stroke={edgeColor}
        strokeWidth={edgeWidth}
      />
      <Group x={startPoint.x} y={startPoint.y}>
        <Path
          offsetY={0}
          offsetX={0}
          rotation={-30}
          fill={edgeColor}
          data={`M 0 0 L -5 -2.5 L -5 2.5 Z`}
        />
      </Group>
    </Group>
  );
};
