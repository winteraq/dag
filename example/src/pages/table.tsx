import * as React from 'react';
import IndexLayout from '../layouts';
import { Dag } from '@library';
import { useRef } from 'react';
import { css } from '@emotion/core';
import { useState } from 'react';
const nodes = [
  {
    id: '1',
    name: '1',
    label: '1',
    dbType: 'hive',
  },
  { id: '2', name: '1', label: '2' },
  { id: '3', name: '2', label: '3' },
  { id: '4', name: '2', label: '4' },
  { id: '5', name: '1', label: '5' },
];
const edges = [
  {
    start: '1',
    end: '2',
  },
  {
    start: '2',
    end: '3',
  },
  {
    start: '3',
    end: '3',
  },
  {
    start: '1',
    end: '5',
  },
  {
    start: '1',
    end: '5',
  },
  {
    start: '3',
    end: '5',
  },
  {
    start: '3',
    end: '4',
  },
];


const IndexPage = () => {
  const dag = useRef<Dag>(null);
  const [activeNode, setActiveNode] = useState<{ id: string; columnId?: string } | undefined>({
    id: '4',
    columnId: '1',
  });
  return (
    <IndexLayout>
      <Dag
        ref={dag}
        edges={edges}
        nodes={nodes}
        // groupBy={{
        //   key: 'name',
        //   label: '负责人',
        // }}
        searchKey={'eve'}
        primaryNode={{ id: '0' }}
        activeNode={activeNode}
        onNodeContextMenu={() => {
          console.log('node context menu');
        }}
        onNodeClick={(e, node, column) => {
          console.log('node click', e, node, column);
          if (node.id === activeNode?.id) {
            setActiveNode(undefined);
          } else {
            setActiveNode({
              id: node.id,
            });
          }
        }}
        onStageClick={() => {
          console.log('stage click');
          setActiveNode(undefined);
        }}
        nodeAttr={(node) => {
          if (node.dbType === 'hive') {
            return {
              highLight: true,
            };
          }
          return {};
        }}
      />
      <button
        css={css`
          position: absolute;
          top: 10px;
          left: 10px;
        `}
        onClick={() => {
          dag.current!.fitView();
        }}
      >
        fitView
      </button>
    </IndexLayout>
  );
};

export default IndexPage;
