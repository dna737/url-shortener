import { createContext } from 'react';
import type { AppContextType } from '@/services';

export const AppContext = createContext<AppContextType | undefined>(undefined);
