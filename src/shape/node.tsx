import React, { useCallback, useMemo, useRef } from 'react';
import { Group, Rect, Stage } from 'react-konva';
import { Node as DNode } from 'dagre';
import { getTheme } from '../theme';
import {
  Node,
  onNodeHover,
  onNodeClick,
  onNodeContextMenu,
  onNodeOutHover,
  ActiveNode,
  NodeAttr,
} from '../types';
import { fittingString, formatText } from '../util';

export const DagNode: React.FC<{
  node: DNode<Node>;
  onClick?: onNodeClick;
  onContextMenu?: onNodeContextMenu;
  onHover?: onNodeHover;
  onColumnHover?: onNodeHover;
  onOutHover?: onNodeOutHover;
  activeNode?: ActiveNode;
  searchKey?: string;
  nodeAttr?: NodeAttr;
  stage?: Stage;
  type: string;
}> = ({
  nodeAttr,
  type,
  node,
  onContextMenu,
  onClick,
  onHover,
  onColumnHover,
  onOutHover,
  searchKey,
  stage,
}) => {
  const nodeRef = useRef<any>(null);
  const columnRef = useRef<any>(null);
  const titleRef = useRef<any>(null);
  const nodeOnHover = useRef(false);
  const columnOnHover = useRef(false);
  const onMouseEnter = onHover
    ? useCallback(() => {
        // console.log(e);
        if (!nodeOnHover.current) {
          onHover && onHover(node, nodeRef.current!.absolutePosition(), stage!.getStage());
        }
        nodeOnHover.current = true;
      }, [onHover, node, stage])
    : undefined;
  const onColumnMouseEnter = onColumnHover
    ? useCallback(
        (_, col, index) => {
          if (!columnOnHover.current) {
            onColumnHover &&
              onColumnHover(
                node,
                nodeRef.current!.absolutePosition(),
                stage!.getStage(),
                col,
                index
              );
          }
          columnOnHover.current = true;
        },
        [onColumnHover, node, stage]
      )
    : undefined;
  const onMouseLeave = onOutHover
    ? useCallback(
        (_) => {
          if (nodeOnHover.current) {
            onOutHover && onOutHover(node);
          }
          if (columnOnHover.current) {
            onOutHover && onOutHover(node);
          }
          nodeOnHover.current = false;
          columnOnHover.current = false;
        },
        [onOutHover, node, columnOnHover, nodeOnHover]
      )
    : undefined;
  const { nodeWidth } = getTheme();
  const attr = useMemo(() => {
    return nodeAttr ? nodeAttr(node) : {};
  }, [nodeAttr, node]);
  return (
    <Group
      ref={nodeRef}
      x={node.x - node.width / 2}
      y={node.y - node.height / 2}
      onContextMenu={(e) => {
        onContextMenu &&
          onContextMenu(e, node, nodeRef.current!.absolutePosition(), stage!.getStage());
      }}
      // onMouseEnter={onMouseEnter}
      // onMouseLeave={onMouseLeave}
    >
      {type === 'column' && (
        <>
          <Rect
            listening={false}
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
              <Group key={col.id}>
                <Group
                  x={18}
                  y={getTheme().nodeHeight * (index + 1) + getTheme().halfNodeHeight - 6}
                  height={getTheme().nodeHeight}
                >
                  <Rect
                    ref={columnRef}
                    cornerRadius={getTheme().nodeBorderRadio}
                    fill={getTheme().hoverBg}
                    opacity={0}
                    strokeWidth={0}
                    x={-17}
                    y={6 - getTheme().halfNodeHeight}
                    width={node.width - 2}
                    height={getTheme().nodeHeight}
                    onClick={(e) => {
                      e.cancelBubble = true;
                      if (e.evt.button === 0) onClick && onClick(e, node, col);
                    }}
                    onMouseEnter={(e) => {
                      onColumnMouseEnter && onColumnMouseEnter(e, col, index);
                      e.target.setAttr('opacity', 1);
                      stage!.getStage().batchDraw();
                    }}
                    onMouseLeave={(e) => {
                      onMouseLeave && onMouseLeave(e);
                      e.target.setAttr('opacity', 0);
                      stage!.getStage().batchDraw();
                    }}
                  />
                  {formatText(
                    col.label,
                    fittingString(col.label, nodeWidth - 20, 12),
                    getTheme(`${col.$state$ || node.$state$}ColumnColor`),
                    searchKey
                  )}
                </Group>
              </Group>
            );
          })}
        </>
      )}
      <Rect
        onClick={(e) => {
          e.cancelBubble = true;
          if (e.evt.button === 0) onClick && onClick(e, node);
        }}
        cornerRadius={getTheme().nodeBorderRadio}
        fill={getTheme(`${node.$state$}Bg`)}
        stroke={getTheme(`${node.$state$}Border`)}
        strokeWidth={1.5}
        width={node.width}
        height={getTheme().nodeHeight}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
      <Rect
        fill={getTheme().nodeDot[node.dbType]}
        cornerRadius={[1, 1, 1, 1]}
        width={6}
        height={6}
        x={8}
        y={getTheme().halfNodeHeight - 3}
      />
      <Group listening={false} x={18} y={getTheme().halfNodeHeight - 6} ref={titleRef}>
        {formatText(
          node.label,
          fittingString(node.label, nodeWidth - 20, 12),
          getTheme(`${node.$state$}Color`),
          searchKey
        )}
      </Group>
      {attr.highLight && (
        <Rect
          listening={false}
          cornerRadius={getTheme().nodeBorderRadio}
          fill={'rgba(255, 255, 255, 0)'}
          width={node.width}
          height={node.height}
          strokeWidth={2}
          stroke={getTheme().nodeHighlightBorder}
        />
      )}
    </Group>
  );
};
