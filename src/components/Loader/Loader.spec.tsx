import { render, screen } from '@testing-library/react';
import Loader from './Loader';

describe('Loader', () => {
  test('Loader renders correctly', () => {
    render(<Loader />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
