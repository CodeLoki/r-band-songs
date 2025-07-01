# Firestore Database Schema

This document describes the existing Firestore database schema for the Band Songs application. This schema will be used as reference for the React app implementation to ensure compatibility with the existing Ember.js application.

## Collections Overview

The database contains the following collections:

- **`bands`** - Band information
- **`songs`** - Individual songs with metadata, tablature links, and band associations
- **`gigs`** - Performance events with setlists and venue information

---

## Collection: `bands`

### Field Descriptions

| Field         | Type   | Description                | Required |
| ------------- | ------ | -------------------------- | -------- |
| `id`          | string | Unique document identifier | Yes      |
| `description` | string | Band description           | Yes      |

---

## Collection: `songs`

### Field Descriptions

| Field        | Type                | Description                             | Required |
| ------------ | ------------------- | --------------------------------------- | -------- |
| `id`         | string              | Unique document identifier              | Yes      |
| `title`      | string              | Song title                              | Yes      |
| `artist`     | string              | Artist/band name                        | Yes      |
| `length`     | number              | Song duration in seconds                | No       |
| `startsWith` | number              | Enum indicating which instrument starts | No       |
| `groove`     | string              | URL to GrooveScribe tablature           | No       |
| `ytMusic`    | string              | YouTube video ID                        | No       |
| `notes`      | string              | Drummer notes and tips                  | No       |
| `pad`        | number              | Required drum pad equipment             | No       |
| `practice`   | boolean             | Flag for songs needing practice         | No       |
| `bands`      | DocumentReference[] | Array of band document references       | No       |

---

## Collection: `gigs`

### Field Descriptions

| Field    | Type                | Description                       | Required |
| -------- | ------------------- | --------------------------------- | -------- |
| `id`     | string              | Unique document identifier        | Yes      |
| `date`   | Timestamp           | Gig date and time                 | Yes      |
| `venue`  | string              | Venue name or location            | Yes      |
| `setOne` | DocumentReference[] | Array of song document references | No       |
| `setTwo` | DocumentReference[] | Array of song document references | No       |
| `pocket` | DocumentReference[] | Array of song document references | No       |
| `band`   | DocumentReference   | Reference to band document        | Yes      |

---

## Indexes

The Firestore database currently has no custom composite indexes configured. All queries use automatic single-field indexes.

---

## Enum Values

### StartsWith Enum

| Value | Label          | Description            |
| ----- | -------------- | ---------------------- |
| 0     | All            | Drums count in         |
| 1     | RhythmGuitar   | Rhythm guitar          |
| 2     | Drums          | Drums                  |
| 3     | DrumsAndKeys   | Drums and keys         |
| 4     | LeadGuitar     | Lead guitar            |
| 5     | LeadAndVocals  | Lead guitar and vocals |
| 6     | DrumsAndBass   | Drums and bass         |
| 7     | DrumsAndGuitar | Drums and guitar       |
| 8     | Bass           | Bass                   |
| 9     | Guitars        | Guitars                |
| 10    | Vocals         | Vocals                 |
| 11    | Keys           | Keys                   |
| 12    | Trumpet        | Trumpet                |

### DrumPad Enum

| Value | Label      | Description             |
| ----- | ---------- | ----------------------- |
| -1    | None       | No auxiliary percussion |
| 0     | Cowbell    | Cowbell (#641)          |
| 1     | Claps      | Claps (#800)            |
| 2     | Tambourine | Tambourine (#724)       |
| 3     | BellTree   | Tree chime (#631)       |
| 4     | China      | China Crash             |
| 5     | Edrum      | EDrum                   |
| 6     | VibraSlap  | VibraSlap (#753)        |
| 7     | Clave      | Clave (#736)            |

---
