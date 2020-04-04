import React from 'react';
import './App.css';
import Dag from '@library';

function App() {
  return (
    <div className="App">
      <Dag
        text="sss"
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
          },
          { id: '2', name: '1' },
          { id: '3', name: '2' },
          { id: '4', name: '2' },
          { id: '5', name: '1' },
        ]}
        groupBy={'name'}
      />
    </div>
  );
}

export default App;
