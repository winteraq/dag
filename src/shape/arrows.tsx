import React from 'react';
import { Path } from 'react-konva';

export const Arrow: React.FC<{ angle?: number; fill?: string; x: number; y: number }> = (props) => {
  return (
    <Path
      angle={props.angle}
      x={props.x}
      y={props.y}
      data={'M 0 0 L -5 -2.5 L 0 -5 z'}
      fill={props.fill || 'green'}
      strokeWidth={1}
    />
  );
};
