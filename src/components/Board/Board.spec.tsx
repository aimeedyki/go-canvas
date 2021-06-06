import { render, screen } from '@testing-library/react';
import Board from './Board';

describe('Board', () => {
  test('Board renders correctly', () => {
    const text = 'I am on a board';
    render(
      <Board>
        <p>{text}</p>
      </Board>
    );

    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });
});
