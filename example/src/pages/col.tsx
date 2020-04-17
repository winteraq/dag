import React, { useCallback } from 'react';
import IndexLayout from '../layouts';
import { Dag } from '@library';
import { useState } from 'react';
import { css } from '@emotion/core';
const edges = [
  { start: '17', end: '51', startCol: '33', endCol: '87' },
  { start: '0', end: '3', startCol: '8', endCol: '7' },
  { start: '3', end: '17', startCol: '7', endCol: '33' },
  { start: '0', end: '3', startCol: '0', endCol: '3' },
  { start: '0', end: '5', startCol: '4', endCol: '5' },
  { start: '3', end: '17', startCol: '3', endCol: '17' },
  { start: '0', end: '9', startCol: '8', endCol: '9' },
  { start: '25', end: '69', startCol: '25', endCol: '69' },
  { start: '17', end: '51', startCol: '17', endCol: '51' },
  { start: '0', end: '1', startCol: '0', endCol: '1' },
  { start: '0', end: '3', startCol: '4', endCol: '7' },
  { start: '5', end: '25', startCol: '5', endCol: '25' },
  { start: '0', end: '1', startCol: '8', endCol: '1' },
];
const nodes = [
  {
    cid: 0,
    urn: 'hive:///test_db/B',
    type: 'hive',
    vid: 3,
    layer: null,
    task_infos: [],
    columns: [
      { id: '3', label: 'col-b2' },
      { id: '7', label: 'col-b1' },
    ],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '3',
    label: 'hive:///test_db/B',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/E',
    type: 'hive',
    vid: 1,
    layer: null,
    task_infos: [],
    columns: [{ id: '1', label: 'col-e1' }],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '1',
    label: 'hive:///test_db/E',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/C',
    type: 'hive',
    vid: 17,
    layer: null,
    task_infos: [],
    columns: [
      { id: '17', label: 'col-c2' },
      { id: '33', label: 'col-c1' },
    ],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '17',
    label: 'hive:///test_db/C',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/F',
    type: 'hive',
    vid: 9,
    layer: null,
    task_infos: [],
    columns: [{ id: '9', label: 'col-f1' }],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '9',
    label: 'hive:///test_db/F',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/I',
    type: 'hive',
    vid: 69,
    layer: null,
    task_infos: [],
    columns: [{ id: '69', label: 'col-i1' }],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '69',
    label: 'hive:///test_db/I',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/D',
    type: 'hive',
    vid: 51,
    layer: null,
    task_infos: [],
    columns: [
      { id: '87', label: 'col-d1' },
      { id: '51', label: 'col-d2' },
    ],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '51',
    label: 'hive:///test_db/D',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/G',
    type: 'hive',
    vid: 5,
    layer: null,
    task_infos: [],
    columns: [{ id: '5', label: 'col-g1' }],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: null,
      department: null,
      tags: null,
    },
    id: '5',
    label: 'hive:///test_db/G',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/H',
    type: 'hive',
    vid: 25,
    layer: null,
    task_infos: [],
    columns: [{ id: '25', label: 'col-h1' }],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: 1,
      department: null,
      tags: null,
    },
    id: '25',
    label: 'hive:///test_db/H',
  },
  {
    cid: 0,
    urn: 'hive:///test_db/A',
    type: 'hive',
    vid: 0,
    layer: null,
    task_infos: [],
    columns: [
      { id: '4', label: 'col-a2' },
      { id: '8', label: 'col-a1' },
      { id: '0', label: 'col-a3' },
    ],
    dataset_info: {
      status: null,
      latest_partition_ct: null,
      comment: null,
      owners: null,
      product_lines: null,
      theme: null,
      layer: null,
      project: null,
      parent_name: null,
      name: 1,
      department: null,
      tags: null,
    },
    id: '0',
    label: 'hive:///test_db/A',
  },
];

const IndexPage = () => {
  const [activeNode, setActiveNode] = useState<{ id: string; columnId?: string } | undefined>({
    id: '4',
    columnId: '1',
  });
  const [hoverInfo, setHoverInfo] = useState<{
    left: number;
    top: number;
    text: string;
    scale: number;
  } | null>(null);
  const onNodeHover = useCallback((node, pos, stage) => {
    console.log('===>', node, pos);
    const scale = stage.scaleX();
    setHoverInfo({
      scale,
      text: node.label,
      left: pos.x + (node.width / 2) * scale,
      top: pos.y,
    });
  }, []);
  const onNodeOutHover = useCallback(() => {
    setHoverInfo(null);
  }, []);
  console.log('hoverInfo', hoverInfo);
  return (
    <IndexLayout>
      <Dag
        edges={edges}
        nodes={nodes}
        groupBy={{
          key: 'dataset_info.name',
          label: '负责人',
        }}
        type={'column'}
        primaryNode={{ id: '3' }}
        activeNode={activeNode}
        searchKey={'test'}
        onStageClick={() => {
          setActiveNode(undefined);
        }}
        onNodeHover={onNodeHover}
        onNodeOutHover={onNodeOutHover}
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
      <div
        css={css`
          left: ${hoverInfo?.left}px;
          top: ${hoverInfo?.top}px;
          position: absolute;
          background-color: #282f38;
          padding: 8px 12px;
          color: white;
          font-size: 14px;
          border-radius: 2px;
          //scale(${hoverInfo?.scale})
          transform: translate(-50%, calc(-100% - 5px)) ;
        `}
      >
        <div
          css={css`
            border: solid transparent;
            content: '';
            height: 8px;
            width: 8px;
            position: absolute;
            left: 0;
            display: block;
            box-sizing: border-box;
            transform: rotate(45deg);
            transform-origin: 50% -50% 0;
            bottom: -5px;
            margin-left: 50%;
            background-color: #282f38;
          `}
        />
        {hoverInfo?.text}
      </div>
    </IndexLayout>
  );
};

export default IndexPage;
