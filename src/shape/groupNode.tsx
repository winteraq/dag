import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { GroupBy, Node } from '../types';
import { measureText } from '../util';

export const DagGroupNode: React.FC<{ node: DNode<Node>; groupBy: GroupBy }> = ({
  node,
  groupBy,
}) => {
  console.log('node',node)
  const text = `${groupBy.label}: ${node[groupBy.key]}`;
  return (
    <Group x={node.x - node.width / 2} y={node.y - node.height / 2}>
      <Group y={-27}>
        <Rect
          cornerRadius={[2, 2, 2, 2]}
          height={28}
          width={measureText(text) + 8}
          fill={getTheme().groupBg}
        />
        <Text text={text} fill={getTheme().groupColor} y={8} x={4} />
      </Group>
      <Rect
        dash={[4, 4]}
        stroke={getTheme().groupBorder}
        strokeWidth={1.5}
        width={node.width}
        height={node.height}
      />
    </Group>
  );
};
