import { ChangeEvent, FC, useContext } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import SaveIndicator from '../SaveIndicator/SaveIndicator';
import { ToolsContext } from '../../context/ToolsContext';

import './Header.scss';

const Header: FC = () => {
  const { nodes, selectedNodeKey, setSelectedNodeKey } = useContext(ToolsContext);

  const handleNodeSelection = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedNodeKey(event.target.value);
  };

  return (
    <header className="header">
      <h3 className="header__logo">GoCanvas</h3>
      <div className="header__tools">
        <SaveIndicator />
        <Dropdown
          label="Highlight a node"
          list={nodes}
          value={selectedNodeKey}
          onChange={handleNodeSelection}
        />
      </div>
    </header>
  );
};

export default Header;
