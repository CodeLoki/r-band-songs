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
    where,
    type DocumentReference,
    type QueryDocumentSnapshot,
    type Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Band, CreateGigData, Gig, Song, UpdateGigData } from '../types/firestore';

// Helper function for data conversion from Firestore
const gigFromFirestore = (snap: QueryDocumentSnapshot): Gig => {
    const data = snap.data();
    return {
        id: snap.id,
        date: data.date as Timestamp,
        venue: data.venue as string,
        setOne: data.setOne as DocumentReference<Song>[] | undefined,
        setTwo: data.setTwo as DocumentReference<Song>[] | undefined,
        pocket: data.pocket as DocumentReference<Song>[] | undefined,
        band: data.band as DocumentReference<Band>
    };
};

// Gig collection reference
const gigsCollection = collection(db, 'gigs');

export class GigService {
    /**
     * Get all gigs ordered by date (newest first)
     */
    static async getAllGigs(): Promise<Gig[]> {
        const gigsQuery = query(gigsCollection, orderBy('date', 'desc'));
        const snapshot = await getDocs(gigsQuery);
        return snapshot.docs.map(doc => gigFromFirestore(doc));
    }

    /**
     * Get gigs for a specific band
     */
    static async getGigsByBand(bandId: string): Promise<Gig[]> {
        const bandRef = doc(db, 'bands', bandId);
        const gigsQuery = query(gigsCollection, where('band', '==', bandRef));
        const snapshot = await getDocs(gigsQuery);
        const gigs = snapshot.docs.map(doc => gigFromFirestore(doc));

        // Sort by date on the client side (newest first)
        return gigs.sort((a, b) => {
            const dateA = a.date.toDate();
            const dateB = b.date.toDate();
            return dateB.getTime() - dateA.getTime();
        });
    }

    /**
     * Get a specific gig by ID
     */
    static async getGigById(id: string): Promise<Gig | null> {
        const gigDoc = doc(gigsCollection, id);
        const snapshot = await getDoc(gigDoc);
        return snapshot.exists() ? gigFromFirestore(snapshot) : null;
    }

    /**
     * Create a new gig
     */
    static async createGig(gigData: CreateGigData): Promise<string> {
        const docRef = await addDoc(gigsCollection, gigData);
        return docRef.id;
    }

    /**
     * Update an existing gig
     */
    static async updateGig(id: string, updates: UpdateGigData): Promise<void> {
        const gigDoc = doc(gigsCollection, id);
        await updateDoc(gigDoc, updates);
    }

    /**
     * Delete a gig
     */
    static async deleteGig(id: string): Promise<void> {
        const gigDoc = doc(gigsCollection, id);
        await deleteDoc(gigDoc);
    }

    /**
     * Add a song to a specific set of a gig
     */
    static async addSongToSet(gigId: string, setName: 'setOne' | 'setTwo' | 'pocket', songId: string): Promise<void> {
        const gig = await this.getGigById(gigId);
        if (!gig) {
            throw new Error(`Gig with ID ${gigId} not found`);
        }

        const songRef = doc(db, 'songs', songId);
        const currentSet = gig[setName] || [];
        const updatedSet = [...currentSet, songRef];

        await this.updateGig(gigId, { [setName]: updatedSet });
    }

    /**
     * Remove a song from a specific set of a gig
     */
    static async removeSongFromSet(
        gigId: string,
        setName: 'setOne' | 'setTwo' | 'pocket',
        songId: string
    ): Promise<void> {
        const gig = await this.getGigById(gigId);
        if (!gig) {
            throw new Error(`Gig with ID ${gigId} not found`);
        }

        const currentSet = gig[setName] || [];
        const updatedSet = currentSet.filter(songRef => songRef.id !== songId);

        await this.updateGig(gigId, { [setName]: updatedSet });
    }

    /**
     * Reorder songs in a specific set of a gig
     */
    static async reorderSongsInSet(
        gigId: string,
        setName: 'setOne' | 'setTwo' | 'pocket',
        songIds: string[]
    ): Promise<void> {
        const songRefs = songIds.map(songId => doc(db, 'songs', songId));
        await this.updateGig(gigId, { [setName]: songRefs });
    }

    /**
     * Get the total duration of a set (requires song data to be loaded)
     */
    static async getSetDuration(songRefs: DocumentReference<Song>[]): Promise<number> {
        let totalDuration = 0;

        for (const songRef of songRefs) {
            const songSnap = await getDoc(songRef);
            if (songSnap.exists()) {
                const songData = songSnap.data();
                totalDuration += songData.length || 0;
            }
        }

        return totalDuration;
    }

    /**
     * Get all songs from all sets of a gig with their data
     */
    static async getGigSongs(gigId: string): Promise<{
        setOne: Song[];
        setTwo: Song[];
        pocket: Song[];
    }> {
        const gig = await this.getGigById(gigId);
        if (!gig) {
            throw new Error(`Gig with ID ${gigId} not found`);
        }

        const loadSongs = async (refs: DocumentReference<Song>[] = []): Promise<Song[]> => {
            const songs: Song[] = [];
            for (const ref of refs) {
                const songSnap = await getDoc(ref);
                if (songSnap.exists()) {
                    const songData = songSnap.data();
                    songs.push({
                        ...songData,
                        id: songSnap.id
                    } as Song);
                }
            }
            return songs;
        };

        return {
            setOne: await loadSongs(gig.setOne),
            setTwo: await loadSongs(gig.setTwo),
            pocket: await loadSongs(gig.pocket)
        };
    }
}
