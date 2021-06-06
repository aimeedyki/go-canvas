import { FC } from 'react';

import Board from './components/Board/Board';
import Diagram from './components/Diagram/Diagram';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Header from './components/Header/Header';
import { ToolsContextProvider } from './context/ToolsContext';
import './App.scss';

const App: FC = () => {
  return (  
    <div className="app">
      <ErrorBoundary>
        <ToolsContextProvider>
          <Header />
          <div className="app__body">
            <Board>         
              <Diagram />
            </Board>
          </div>
        </ToolsContextProvider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
