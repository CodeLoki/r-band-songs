import { useContext } from 'react';
import { BandContext, type BandContextType } from './BandContextDefinition';

// Custom hook to use the BandContext
export const useBand = (): BandContextType => {
    const context = useContext(BandContext);
    if (context === undefined) {
        throw new Error('useBand must be used within a BandProvider');
    }
    return context;
};
