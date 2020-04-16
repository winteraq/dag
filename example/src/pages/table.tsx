import * as React from 'react';
import IndexLayout from '../layouts';
import { Dag } from '@library';
import { useRef } from 'react';
import { css } from '@emotion/core';

const IndexPage = () => {
  const dag = useRef<Dag>(null);
  return (
    <IndexLayout>
      <Dag
        ref={dag}
        edges={[
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
        ]}
        nodes={[
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
        ]}
        groupBy={{
          key: 'name',
          label: '负责人',
        }}
        activeNode={{ id: '2' }}
        onNodeContextMenu={() => {
          console.log('node context menu');
        }}
        onNodeClick={() => {
          console.log('node click');
        }}
        onStageClick={() => {
          console.log('stage click');
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
