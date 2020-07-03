import React from 'react';
import TaskBox from './components/TaskBox';
import CreateTask from './components/CreateTask';
import IconButton from './components/IconButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        TO DO LIST
      </header>
      <div className="insert-icon">
        <IconButton type="add" onClick={()=>{}}></IconButton>
      </div>
      <div className="date">Date: </div>
      <TaskBox />
      <TaskBox />
      <TaskBox />
      <CreateTask />
    </div>
  );
}

export default App;
