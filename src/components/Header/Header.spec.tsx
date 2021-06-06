import { render, screen } from '@testing-library/react';

import Header from './Header';
import { ToolsContext } from '../../context/ToolsContext';

const renderHeader = () => {
  return render(
    <ToolsContext.Provider
      value={{
        isSaving: true,
        nodes: [
          { key: 1, label: 'key 1' },
          { key: 2, label: 'key 2' },
          { key: 3, label: 'key 3' },
        ],
        selectedNodeKey: '1',
        setSelectedNodeKey: jest.fn(),
      }}
    >
      <Header />
    </ToolsContext.Provider>
  );
};

describe('Header Component', () => {
  test('Header renders correctly', async () => {
    renderHeader();
    const dropdownElement = screen.getByTestId('dropdown') as HTMLInputElement;

    expect(screen.getByText('GoCanvas')).toBeInTheDocument();
    expect(screen.getByText('Saving')).toBeInTheDocument();
    expect(dropdownElement.value).toBe('1');
    expect(screen.getByText('Saving')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
