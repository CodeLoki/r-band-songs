import { useQueryParams } from '@/hooks';
import { BandService } from '@/services';
import type { Band } from '@/types';
import React, { useEffect, useState, type ReactNode } from 'react';
import { BandContext, type BandContextType } from './BandContextDefinition';

interface BandProviderProps {
    children: ReactNode;
}

export const BandProvider: React.FC<BandProviderProps> = ({ children }) => {
    const { getBandId, setBandId: setUrlBandId } = useQueryParams();
    const [currentBand, setCurrentBand] = useState<Band | null>(null);
    const [bands, setBands] = useState<Band[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get current band ID from URL
    const currentBandId = getBandId();

    // Load all bands on mount
    const loadBands = async () => {
        try {
            setError(null);
            const fetchedBands = await BandService.getAllBands();
            setBands(fetchedBands);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load bands');
            console.error('Error loading bands:', err);
        }
    };

    // Load current band based on URL parameter
    const loadCurrentBand = async (bandId: string) => {
        try {
            setError(null);
            setLoading(true);
            const band = await BandService.getBandById(bandId);
            setCurrentBand(band);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load current band');
            console.error('Error loading current band:', err);
            setCurrentBand(null);
        } finally {
            setLoading(false);
        }
    };

    // Set band ID in URL and update current band
    const setBandId = (bandId: string) => {
        setUrlBandId(bandId);
        void loadCurrentBand(bandId);
    };

    // Refresh bands list
    const refreshBands = async () => {
        await loadBands();
    };

    // Load bands on mount
    useEffect(() => {
        void loadBands();
    }, []);

    // Load current band when URL changes
    useEffect(() => {
        void loadCurrentBand(currentBandId);
    }, [currentBandId]);

    const contextValue: BandContextType = {
        currentBand,
        bands,
        loading,
        error,
        setBandId,
        refreshBands
    };

    return <BandContext.Provider value={contextValue}>{children}</BandContext.Provider>;
};
