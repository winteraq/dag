import React from 'react';
import { Group, Rect } from 'react-konva';
import { Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { Node, onNodeClick, onNodeContextMenu } from '../types';
import { formatText } from '../util';

export const DagNode: React.FC<{
  node: DNode<Node>;
  onClick?: onNodeClick;
  onContextMenu?: onNodeContextMenu;
}> = ({ node, onContextMenu, onClick }) => {
  return (
    <Group
      x={node.x - node.width / 2}
      y={node.y - node.height / 2}
      onClick={(e) => {
        onClick && onClick(e, node);
      }}
      onContextMenu={(e) => {
        onContextMenu && onContextMenu(e, node);
      }}
    >
      <Rect
        cornerRadius={getTheme().nodeBorderRadio}
        fill={getTheme(`${node.type || 'secondary'}Bg`)}
        stroke={getTheme(`${node.type || 'secondary'}Border`)}
        strokeWidth={1.5}
        width={node.width}
        height={getTheme().nodeHeight}
      />
      <Rect
        fill={getTheme().nodeDot[node.dbType]}
        cornerRadius={[1, 1, 1, 1]}
        width={6}
        height={6}
        x={8}
        y={getTheme().halfNodeHeight - 3}
      />
      <Group x={18} y={getTheme().halfNodeHeight - 6}>
        {formatText(node)}
      </Group>
    </Group>
  );
};
