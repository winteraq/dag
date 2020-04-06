import React from 'react';
import { Dag } from '@library';

function App() {
  return (
    <div className="App">
      <Dag
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
      />
    </div>
  );
}

export default App;
