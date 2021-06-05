import { createContext, FC, ReactNode, useState } from 'react';

import { Node } from '../utils'

export const ToolsContext = createContext(null);

export const ToolsContextProvider: FC = ({ children }: ToolsContextProps) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>();

  return (
    <ToolsContext.Provider
      value={{
        nodes,
        selectedNodeKey,
        setNodes,
        setSelectedNodeKey,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

interface ToolsContextProps {
  children: ReactNode;
}
