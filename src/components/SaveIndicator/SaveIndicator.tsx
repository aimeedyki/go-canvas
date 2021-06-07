import { memo, ReactElement } from 'react';

import CheckIcon from '../../assets/icons/check-mark-button.svg';
import CycleIcon from '../../assets/icons/recycle.svg';
import './SaveIndicator.scss';

const SaveIndicator = memo(({ isSaving }: SaveIndicatorProps): ReactElement => {
  return (
    <div className="save-indicator" data-testid="save-indicator">
      {isSaving ? (
        <CycleIcon className="save-indicator__icons" />
      ) : (
        <CheckIcon className="save-indicator__icons" />
      )}
      <p className={`save-indicator__text ${isSaving ? 'save-indicator__text--saving' : ''}`}>
        {isSaving ? 'Saving' : 'Saved'}
      </p>
    </div>
  );
});

interface SaveIndicatorProps {
  isSaving: boolean;
}

export default SaveIndicator;
