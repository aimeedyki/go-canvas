import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

const renderDropdown = () => {
  return render(
    <Dropdown
      label="Test Label"
      list={[
        { key: 1, label: 'key 1' },
        { key: 2, label: 'key 2' },
        { key: 3, label: 'key 3' },
      ]}
      onItemSelect={jest.fn()}
      value=""
    />
  );
};

describe('Dropdown', () => {
  test('Dropdown renders correctly', () => {
    renderDropdown();
    const dropdownElement = screen.getByTestId('dropdown') as HTMLInputElement;

    expect(dropdownElement.value).toBe('');
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByTestId('dropdown')).toBeInTheDocument();
  });
});
