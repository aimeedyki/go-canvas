import { FC } from 'react';

import Board from './components/Board/Board';
import Diagram from './components/Diagram/Diagram';
import Header from './components/Header/Header';
import { data } from './utils';
import initDiagram from './utils/initDiagram';

import './App.scss';

const App: FC = () => {
  return (  
    <div className="app">
      <Header />
      <div className="app__body">
        <Board>         
          <Diagram initDiagram={initDiagram} nodeDataArray={data.nodes} linkDataArray={data.links} />
        </Board>
      </div>
    </div>
  );
};

export default App;
