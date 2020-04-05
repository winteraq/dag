import React from 'react';
import Dag from '@library';

function App() {
  return (
    <div className="App">
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
            endCol: '2',
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
            label: '1',
            columns: [
              { id: '1', label: '1' },
              { id: '2', label: '2' },
            ],
          },
          {
            id: '2',
            name: '1',
            label: '2',
            columns: [
              { id: '1', label: '1' },
              { id: '2', label: '2' },
              { id: '3', label: '3' },
            ],
          },
          {
            id: '3',
            name: '2',
            label: '3',
            columns: [
              { id: '1', label: '1' },
              { id: '2', label: '2' },
            ],
          },
          {
            id: '4',
            name: '2',
            label: '4',
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
      />
    </div>
  );
}

export default App;
