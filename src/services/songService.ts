import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { CreateSongData, Song, UpdateSongData } from '../types/firestore';

/**
 * Service for managing songs in Firestore
 * Provides CRUD operations and band-specific song filtering
 */
export class SongService {
    private static readonly COLLECTION_NAME = 'songs';

    /**
     * Get all songs
     */
    static async getAllSongs(): Promise<Song[]> {
        try {
            const songsCollection = collection(db, this.COLLECTION_NAME);
            const q = query(songsCollection, orderBy('title'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Song[];
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw new Error('Failed to fetch songs');
        }
    }

    /**
     * Get songs for a specific band
     */
    static async getSongsByBandId(bandId: string): Promise<Song[]> {
        try {
            const bandRef = doc(db, 'bands', bandId);
            const songsCollection = collection(db, this.COLLECTION_NAME);

            // First try with the array-contains query only (no orderBy to avoid composite index requirement)
            const q = query(songsCollection, where('bands', 'array-contains', bandRef));
            const querySnapshot = await getDocs(q);

            const songs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Song[];

            // Sort client-side by title
            return songs.sort((a, b) => a.title.localeCompare(b.title));
        } catch (error) {
            console.error('Error fetching songs for band:', error);
            console.error('Band ID:', bandId);

            // If the array-contains query fails, try to get all songs and filter client-side
            try {
                const allSongs = await this.getAllSongs();
                const filteredSongs = allSongs.filter(song => song.bands?.some(ref => ref.id === bandId));
                return filteredSongs;
            } catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                throw new Error('Failed to fetch songs for band');
            }
        }
    }

    /**
     * Get a single song by ID
     */
    static async getSongById(songId: string): Promise<Song> {
        try {
            const songDoc = doc(db, this.COLLECTION_NAME, songId);
            const docSnapshot = await getDoc(songDoc);

            if (!docSnapshot.exists()) {
                throw new Error('Song not found');
            }

            return {
                id: docSnapshot.id,
                ...docSnapshot.data()
            } as Song;
        } catch (error) {
            console.error('Error fetching song:', error);
            throw new Error('Failed to fetch song');
        }
    }

    /**
     * Create a new song
     */
    static async createSong(songData: CreateSongData): Promise<string> {
        try {
            const songsCollection = collection(db, this.COLLECTION_NAME);
            const docRef = await addDoc(songsCollection, songData);
            return docRef.id;
        } catch (error) {
            console.error('Error creating song:', error);
            throw new Error('Failed to create song');
        }
    }

    /**
     * Update an existing song
     */
    static async updateSong(songId: string, updateData: UpdateSongData): Promise<void> {
        try {
            const songDoc = doc(db, this.COLLECTION_NAME, songId);
            await updateDoc(songDoc, updateData);
        } catch (error) {
            console.error('Error updating song:', error);
            throw new Error('Failed to update song');
        }
    }

    /**
     * Delete a song
     */
    static async deleteSong(songId: string): Promise<void> {
        try {
            const songDoc = doc(db, this.COLLECTION_NAME, songId);
            await deleteDoc(songDoc);
        } catch (error) {
            console.error('Error deleting song:', error);
            throw new Error('Failed to delete song');
        }
    }

    // /**
    //  * Add a band to a song's bands array
    //  */
    // static async addBandToSong(songId: string, bandId: string): Promise<void> {
    //     try {
    //         const song = await this.getSongById(songId);
    //         const bandRef = doc(db, 'bands', bandId);

    //         // Check if band is already associated
    //         const isAlreadyAssociated = song.bands?.some(ref => ref.id === bandId);
    //         if (isAlreadyAssociated) {
    //             return; // Already associated, no need to add
    //         }

    //         const updatedBands = [...(song.bands || []), bandRef];
    //         await this.updateSong(songId, { bands: updatedBands as any });
    //     } catch (error) {
    //         console.error('Error adding band to song:', error);
    //         throw new Error('Failed to add band to song');
    //     }
    // }

    // /**
    //  * Remove a band from a song's bands array
    //  */
    // static async removeBandFromSong(songId: string, bandId: string): Promise<void> {
    //     try {
    //         const song = await this.getSongById(songId);

    //         if (!song.bands) {
    //             return; // No bands associated
    //         }

    //         const updatedBands = song.bands.filter(ref => ref.id !== bandId);
    //         await this.updateSong(songId, { bands: updatedBands });
    //     } catch (error) {
    //         console.error('Error removing band from song:', error);
    //         throw new Error('Failed to remove band from song');
    //     }
    // }

    /**
     * Format song duration from seconds to MM:SS
     */
    static formatDuration(seconds?: number): string {
        if (!seconds) return '';

        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Get YouTube URL from video ID
     */
    static getYouTubeUrl(videoId?: string): string | null {
        if (!videoId) return null;
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
}
