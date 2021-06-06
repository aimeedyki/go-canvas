import { render, screen } from '@testing-library/react';
import SaveIndicator from './SaveIndicator';

const renderSaveIndicator = (isSaving: boolean) => {
  return render(<SaveIndicator isSaving={isSaving} />);
};

describe('SaveIndicator Component', () => {
  test('SaveIndicator renders correctly when indicating saving state', () => {
    renderSaveIndicator(true);

    expect(screen.getByText('Saving')).toBeInTheDocument();
    expect(screen.getByTestId('save-indicator')).toBeInTheDocument();
  });

  test('SaveIndicator renders correctly when indicating saved state', () => {
    renderSaveIndicator(false);

    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByTestId('save-indicator')).toBeInTheDocument();
  });
});
