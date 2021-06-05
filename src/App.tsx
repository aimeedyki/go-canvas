import { FC } from 'react';

import Board from './components/Board/Board';
import Diagram from './components/Diagram/Diagram';
import Header from './components/Header/Header';
import { ToolsContextProvider } from './context/ToolsContext';
import './App.scss';

const App: FC = () => {
  return (  
    <div className="app">
      <ToolsContextProvider>
        <Header />
        <div className="app__body">
          <Board>         
            <Diagram />
          </Board>
        </div>
      </ToolsContextProvider>
    </div>
  );
};

export default App;
