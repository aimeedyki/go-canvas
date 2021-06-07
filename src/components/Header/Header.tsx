import { FC, useCallback, useContext } from 'react';

import Dropdown from '../Dropdown/Dropdown';
import SaveIndicator from '../SaveIndicator/SaveIndicator';
import { ToolsContext } from '../../context/ToolsContext';

import './Header.scss';

const Header: FC = () => {
  const { isSaving, nodes, selectedNodeKey, setSelectedNodeKey } = useContext(ToolsContext);

  const handleNodeSelection = useCallback((value: string) => {
    setSelectedNodeKey(value);
  }, []);

  return (
    <header className="header" data-testid="header">
      <h3 className="header__logo">GoCanvas</h3>
      <div className="header__tools">
        <SaveIndicator isSaving={isSaving} />
        <Dropdown
          label={selectedNodeKey ? 'Remove highlight' : 'Highlight a node'}
          list={nodes}
          value={selectedNodeKey}
          onItemSelect={handleNodeSelection}
        />
      </div>
    </header>
  );
};

export default Header;
