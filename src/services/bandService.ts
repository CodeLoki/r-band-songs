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
    type DocumentData,
    type QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Band } from '../types/firestore';

// Helper functions for data conversion
const bandFromFirestore = (snap: QueryDocumentSnapshot): Band => {
    const data = snap.data();
    return {
        id: snap.id,
        description: data.description as string
    };
};

const bandToFirestore = (band: Partial<Band>): DocumentData => ({
    description: band.description
});

// Band collection reference
const bandsCollection = collection(db, 'bands');

export class BandService {
    /**
     * Get all bands
     */
    static async getAllBands(): Promise<Band[]> {
        const bandsQuery = query(bandsCollection, orderBy('description'));
        const snapshot = await getDocs(bandsQuery);
        return snapshot.docs.map(doc => bandFromFirestore(doc));
    }

    /**
     * Get a specific band by ID
     */
    static async getBandById(id: string): Promise<Band | null> {
        const bandDoc = doc(bandsCollection, id);
        const snapshot = await getDoc(bandDoc);
        return snapshot.exists() ? bandFromFirestore(snapshot) : null;
    }

    /**
     * Create a new band
     */
    static async createBand(bandData: Omit<Band, 'id'>): Promise<string> {
        const docRef = await addDoc(bandsCollection, bandToFirestore(bandData));
        return docRef.id;
    }

    /**
     * Update an existing band
     */
    static async updateBand(id: string, updates: Partial<Omit<Band, 'id'>>): Promise<void> {
        const bandDoc = doc(bandsCollection, id);
        await updateDoc(bandDoc, bandToFirestore(updates));
    }

    /**
     * Delete a band
     */
    static async deleteBand(id: string): Promise<void> {
        const bandDoc = doc(bandsCollection, id);
        await deleteDoc(bandDoc);
    }
}
