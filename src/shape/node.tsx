import React, { useCallback, useRef } from 'react';
import { Group, Rect } from 'react-konva';
import { Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import { Node, onNodeHover, onNodeClick, onNodeContextMenu, onNodeOutHover } from '../types';
import { formatText } from '../util';

export const DagNode: React.FC<{
  node: DNode<Node>;
  onClick?: onNodeClick;
  onContextMenu?: onNodeContextMenu;
  onHover?: onNodeHover;
  onOutHover?: onNodeOutHover;
  activeNode?: Node;
  type: string;
}> = ({ type, node, onContextMenu, onClick, onHover, onOutHover }) => {
  const nodeOnHover = useRef(false);
  const onMouseEnter = onHover
    ? useCallback(() => {
        if (!nodeOnHover.current) {
          onHover && onHover(node);
        }
        nodeOnHover.current = true;
      }, [])
    : undefined;
  const onMouseLeave = onOutHover
    ? useCallback(() => {
        if (nodeOnHover.current) {
          onOutHover && onOutHover(node);
        }
        nodeOnHover.current = false;
      }, [])
    : undefined;
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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {type === 'column' && (
        <Group>
          <Rect
            cornerRadius={getTheme().nodeBorderRadio}
            fill={'#FFFFFF'}
            stroke={getTheme(`${node.$state$}Border`)}
            strokeWidth={1.5}
            width={node.width}
            height={getTheme().nodeHeight * ((node.columns?.length || 0) + 1)}
          />
          {node.columns?.map((col, index) => {
            if (!node.$columnMap$) {
              node.$columnMap$ = {};
            }
            node.$columnMap$[col.id] = { ...col, index: index + 1 };
            return (
              <Group
                key={col.id}
                x={18}
                y={getTheme().nodeHeight * (index + 1) + getTheme().halfNodeHeight - 6}
              >
                {formatText(col)}
              </Group>
            );
          })}
        </Group>
      )}
      <Rect
        cornerRadius={getTheme().nodeBorderRadio}
        fill={getTheme(`${node.$state$}Bg`)}
        stroke={getTheme(`${node.$state$}Border`)}
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
