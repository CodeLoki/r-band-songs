import { collection, doc, getDoc, getDocs, orderBy, query, type QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Band } from '../types/firestore';

// Helper function for data conversion
const bandFromFirestore = (snap: QueryDocumentSnapshot): Band => {
    const data = snap.data();
    return {
        id: snap.id,
        description: data.description as string
    };
};

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
}
