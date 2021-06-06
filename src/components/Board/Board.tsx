import { FC, ReactNode } from 'react';

import './Board.scss';

const Board: FC = ({ children }: BoardProps) => {
  return <div className="board" data-testid="board">{children}</div>;
};

interface BoardProps {
  children: ReactNode;
}

export default Board;
