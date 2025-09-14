import { useState, type ReactNode } from 'react';
import { AppContext } from './AppContextStore';
import type { AppContextType } from '@/services';

interface AppContextProviderProps {
  children: ReactNode;
}

export default function AppContextProvider({ children }: AppContextProviderProps) {
  const [canShowPreview, setCanShowPreview] = useState<boolean>(true);

  const value: AppContextType = {
    canShowPreview,
    setCanShowPreview,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
