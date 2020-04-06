import React from 'react';
import IndexLayout from '../layouts';
import { Dag } from '@library';
import { useState } from 'react';

const IndexPage = () => {
  const [activeNode, setActiveNode] = useState<{ id: string; columnId?: string } | undefined>({
    id: '4',
    columnId: '1',
  });
  return (
    <IndexLayout>
      <Dag
        edges={[
          {
            start: '1',
            end: '2',
            startCol: '1',
            endCol: '2',
          },
          {
            start: '2',
            end: '3',
            startCol: '1',
            endCol: '2',
          },
          {
            start: '3',
            end: '3',
            startCol: '1',
            endCol: '1',
          },
          {
            start: '1',
            end: '5',
            startCol: '1',
            endCol: '2',
          },
          {
            start: '1',
            end: '5',
            startCol: '2',
            endCol: '1',
          },
          {
            start: '3',
            end: '5',
            startCol: '1',
            endCol: '2',
          },
          {
            start: '3',
            end: '4',
            startCol: '1',
            endCol: '2',
          },
        ]}
        nodes={[
          {
            id: '1',
            name: '1',
            label: 'moring',
            columns: [
              { id: '1', label: 'nihao' },
              { id: '2', label: 'moring' },
            ],
          },
          {
            id: '2',
            name: '1',
            label: 'nihao',
            columns: [
              { id: '1', label: 'nihao' },
              { id: '2', label: 'moring' },
              { id: '3', label: 'hello' },
            ],
          },
          {
            id: '3',
            name: '2',
            label: 'hello title',
            columns: [
              { id: '1', label: 'hello' },
              { id: '2', label: '2' },
            ],
          },
          {
            id: '4',
            name: '2',
            label: '超长的文本被截断了',
            columns: [
              { id: '1', label: '1' },
              { id: '2', label: '2' },
              { id: '3', label: '3' },
            ],
          },
          {
            id: '5',
            name: '1',
            label: '5',
            columns: [
              { id: '1', label: '1' },
              { id: '2', label: '2' },
              { id: '3', label: '3' },
            ],
          },
        ]}
        groupBy={{
          key: 'name',
          label: '负责人',
        }}
        type={'column'}
        primaryNode={{ id: '2' }}
        activeNode={activeNode}
        searchKey={'hello'}
        onStageClick={() => {
          setActiveNode(undefined);
        }}
        onNodeClick={(e, node, column) => {
          console.log(e, node, column);
          if (node.id === activeNode?.id) {
            if (activeNode.columnId === column?.id) {
              setActiveNode(undefined);
              return;
            }
          }
          setActiveNode({
            id: node.id,
            columnId: column?.id,
          });
        }}
      />
    </IndexLayout>
  );
};

export default IndexPage;