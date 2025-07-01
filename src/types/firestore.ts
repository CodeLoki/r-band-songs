// Firestore data types based on the actual Ember app schema

import type { DocumentReference, Timestamp } from 'firebase/firestore';

// Enum types from the schema
export enum StartsWithEnum {
    All = 0,
    RhythmGuitar = 1,
    Drums = 2,
    DrumsAndKeys = 3,
    LeadGuitar = 4,
    LeadAndVocals = 5,
    DrumsAndBass = 6,
    DrumsAndGuitar = 7,
    Bass = 8,
    Guitars = 9,
    Vocals = 10,
    Keys = 11,
    Trumpet = 12
}

export enum DrumPadEnum {
    None = -1,
    Cowbell = 0,
    Claps = 1,
    Tambourine = 2,
    BellTree = 3,
    China = 4,
    Edrum = 5,
    VibraSlap = 6,
    Clave = 7
}

export interface Band {
    id: string;
    description: string;
}

export interface Song {
    id: string;
    title: string;
    artist: string;
    length?: number; // Song duration in seconds
    startsWith?: StartsWithEnum; // Enum indicating which instrument starts
    groove?: string; // URL to GrooveScribe tablature
    ytMusic?: string; // YouTube video ID
    notes?: string; // Drummer notes and tips
    pad?: DrumPadEnum; // Required drum pad equipment
    practice?: boolean; // Flag for songs needing practice
    bands?: DocumentReference<Band>[]; // Array of band document references
}

export interface Gig {
    id: string;
    date: Timestamp; // Gig date and time
    venue: string; // Venue name or location
    setOne?: DocumentReference<Song>[]; // Array of song document references
    setTwo?: DocumentReference<Song>[]; // Array of song document references
    pocket?: DocumentReference<Song>[]; // Array of song document references
    band: DocumentReference<Band>; // Reference to band document
}

// Helper types for creating new documents (without id and with optional references)
export type CreateBandData = Omit<Band, 'id'>;
export type CreateSongData = Omit<Song, 'id'>;
export type CreateGigData = Omit<Gig, 'id'>;

// Helper types for updating documents (all fields optional except id)
export type UpdateBandData = Partial<Omit<Band, 'id'>>;
export type UpdateSongData = Partial<Omit<Song, 'id'>>;
export type UpdateGigData = Partial<Omit<Gig, 'id'>>;
