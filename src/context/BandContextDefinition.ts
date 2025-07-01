import type { Band } from '@/types';
import { createContext } from 'react';

export interface BandContextType {
    currentBand: Band | null;
    bands: Band[];
    loading: boolean;
    error: string | null;
    setBandId: (bandId: string) => void;
    refreshBands: () => Promise<void>;
}

export const BandContext = createContext<BandContextType | undefined>(undefined);
