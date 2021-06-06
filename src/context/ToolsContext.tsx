import { createContext, FC, ReactNode, useEffect, useState } from 'react';

import { Node } from '../utils'

export const ToolsContext = createContext(null);

export const ToolsContextProvider: FC = ({ children }: ToolsContextProps) => {
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');
  const [nodes, setNodes] = useState<Node[]>();
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect(() => {
    if (isSaving) {
      const id = setTimeout(() => setIsSaving(false), 5000);

      return () => clearTimeout(id);
    }
  }, [isSaving]);

  return (
    <ToolsContext.Provider
      value={{
        isSaving,
        nodes,
        selectedNodeKey,
        setIsSaving,
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
