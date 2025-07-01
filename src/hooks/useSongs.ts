import { SongService } from '@/services';
import type { Song } from '@/types';
import { useCallback, useState } from 'react';

/**
 * Custom hook for managing songs data
 */
export const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load all songs
    const loadAllSongs = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const fetchedSongs = await SongService.getAllSongs();
            setSongs(fetchedSongs);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load songs');
            console.error('Error loading songs:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load songs for a specific band
    const loadSongsByBand = useCallback(async (bandId: string) => {
        try {
            setError(null);
            setLoading(true);
            const fetchedSongs = await SongService.getSongsByBandId(bandId);
            setSongs(fetchedSongs);
        } catch (err) {
            console.error('Hook error loading songs for band:', err);
            setError(err instanceof Error ? err.message : 'Failed to load songs for band');
        } finally {
            setLoading(false);
        }
    }, []);

    // Format song duration
    const formatDuration = useCallback((seconds?: number): string => {
        return SongService.formatDuration(seconds);
    }, []);

    // Get YouTube URL from video ID
    const getYouTubeUrl = useCallback((videoId?: string): string | null => {
        return SongService.getYouTubeUrl(videoId);
    }, []);

    return {
        songs,
        loading,
        error,
        loadAllSongs,
        loadSongsByBand,
        formatDuration,
        getYouTubeUrl
    };
};
