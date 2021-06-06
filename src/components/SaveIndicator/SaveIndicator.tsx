import { FC, useContext } from 'react';

import { ToolsContext } from '../../context/ToolsContext';
import CheckIcon from '../../assets/icons/check-mark-button.svg';
import CycleIcon from '../../assets/icons/recycle.svg';
import './SaveIndicator.scss';

const SaveIndicator: FC = () => {
  const { isSaving } = useContext(ToolsContext);

  return (
    <div className="save">
      {isSaving ? <CycleIcon className="save__icons" /> : <CheckIcon className="save__icons" />}
      <p className={`save__text ${isSaving ? 'save__text--saving' : ''}`}>
        {isSaving ? 'Saving' : 'Saved'}
      </p>
    </div>
  );
};

export default SaveIndicator;
