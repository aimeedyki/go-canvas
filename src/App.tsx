import { FC } from 'react';

import Board from './components/Board/Board';
import Header from './components/Header/Header';

import './App.scss';

const App: FC = () => {
  return (  
    <div className="app">
      <Header />
      <div className="app__body">
        <Board>
          <h1>Welcome to GoCanvas</h1>
        </Board>
      </div>
    </div>
  );
};

export default App;
