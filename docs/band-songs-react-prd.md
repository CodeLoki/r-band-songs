# Band Songs React App - Product Requirements Document

## Overview

This document outlines the requirements for creating a React-based band management application that helps musicians organize songs, manage setlists, and plan gigs. The application will be built based on the existing Ember.js version at [CodeLoki/band-songs](https://github.com/CodeLoki/band-songs), which is hosted at [https://band-songs-1iddr.kinsta.page/](https://band-songs-1iddr.kinsta.page/). The new React application will also be hosted on Kinsta.

## Project Goals

- Create a modern, responsive web application for band song and gig management
- Provide an intuitive interface for musicians to organize their repertoire
- Enable efficient setlist creation and gig planning
- Support multiple bands and collaborative features
- Integrate with external services for enhanced functionality

## Target Users

- **Primary**: Musicians and band members who need to organize songs and plan performances
- **Secondary**: Band leaders and managers who coordinate multiple bands
- **Tertiary**: Session musicians who work with various groups

## Core Features

### 1. Song Management

#### 1.1 Song Library

- **Create, edit, and delete songs** with comprehensive metadata
- **Song properties include**:
    - Title and artist
    - Song length (in seconds)
    - Starting musician/instrument
    - GrooveScribe drum tablature integration
    - YouTube Music links for reference
    - Drummer notes and performance tips
    - Auxiliary percussion pad requirements
    - Practice flag for songs needing work
    - Band associations (songs can belong to multiple bands)

#### 1.2 Song Views and Filtering

- **All Songs View**: Complete song library
- **Practice View**: Songs flagged for practice
- **Incomplete View**: Songs missing groove or YouTube links
- **Orphaned Songs**: Songs not associated with any band
- **Other Songs**: Songs from other bands in the system

#### 1.3 Song Actions

- **Performance Mode**: View-only mode for live performances
- **Rehearsal Mode**: Full-screen tablature with embedded YouTube
- **Practice Mode**: Interactive mode for learning
- **Edit Mode**: Modify song details
- **Flag Mode**: Mark songs for practice or other statuses

### 2. Band Management

#### 2.1 Multi-Band Support

- Users can belong to multiple bands
- Easy switching between bands
- Band-specific song libraries
- Shared songs across bands

#### 2.2 User Roles

- **Regular User**: View-only access
- **Band Member**: Can edit songs and create gigs
- **Band Leader**: Full administrative access

### 3. Gig Management

#### 3.1 Gig Creation and Planning

- **Create gigs** with date and venue information
- **Setlist builder** with drag-and-drop functionality
- **Multiple sets support**:
    - Set One
    - Set Two
    - Pocket songs (backup/filler songs)
- **Automatic timing calculations** for set lengths
- **Song reordering** within sets
- **Available songs pool** showing unassigned songs

#### 3.2 Gig Views

- **Gig calendar/list view**
- **Individual gig details** with complete setlists
- **Performance view** optimized for live use
- **Edit restrictions** for past gigs

### 4. User Interface Components

#### 4.1 Navigation

- **Fixed header** with band selector
- **Main navigation**: Gigs, Songs
- **Context-sensitive action buttons**
- **Responsive design** for mobile and desktop

#### 4.2 Song Cards

- **Visual song cards** with key information
- **Quick actions** based on current mode
- **Color coding** for different song states
- **Grid layout** with responsive columns

#### 4.3 Forms and Inputs

- **Modern form controls** with validation
- **Dropdown selectors** for enums (starting instrument, drum pads)
- **Textarea support** for longer content
- **Checkbox groups** for multi-selection
- **Date pickers** for gig scheduling

## Technical Requirements

### 5. Technology Stack

#### 5.1 Frontend

- **React 18+** with hooks and functional components
- **TypeScript** for type safety
- **React Router** for navigation
- **State Management**: Context API or Redux Toolkit
- **UI Framework**: Material-UI or Ant Design (similar to Elastic UI)
- **Form Handling**: React Hook Form or Formik
- **Styling**: CSS Modules or styled-components

#### 5.2 Backend Integration

- **Firebase/Firestore** for data persistence (matching existing backend)
- **Authentication** with Firebase Auth
- **Real-time updates** for collaborative features
- **Cloud Functions** for server-side logic if needed

#### 5.3 Firebase Configuration

- **Environment Variables**: Firebase configuration will be passed via shell environment variables rather than committed config files
- **Required Environment Variables**:
    - `VITE_FIREBASE_API_KEY`: Firebase project API key
    - `VITE_FIREBASE_AUTH_DOMAIN`: Firebase authentication domain
    - `VITE_FIREBASE_PROJECT_ID`: Firebase project ID
    - `VITE_FIREBASE_STORAGE_BUCKET`: Firebase storage bucket
    - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
    - `VITE_FIREBASE_APP_ID`: Firebase application ID
- **Development Setup**: Developers will set environment variables in their shell or use `.env.local` files (not committed to repo)
- **Production Deployment**: Environment variables will be configured in the hosting platform (Firebase Hosting, Vercel, etc.)
- **Security**: No Firebase credentials stored in source code or committed configuration files

#### 5.4 URL Query Parameters

The application will support query parameters for deep linking and state management:

- **Band Parameter (`b`)**:
    - Optional query parameter: `?b=<bandId>`
    - Default value: `'qRphnEOTg8GeDc0dQa4K'` (when parameter is not provided)
    - Purpose: Specifies which band's data to display
    - Example: `https://band-songs.example.com/?b=abc123xyz`

- **User Parameter (`u`)**:
    - Optional qsuery parameter: `?u=<userId>`
    - Default value: `''` (empty string when parameter is not provided)
    - Purpose: Identifies the current user context
    - Example: `https://band-songs.example.com/?u=z&b=abc123xyz`

- **Combined Usage**:
    - Full URL example: `https://band-songs.example.com/?b=qRphnEOTg8GeDc0dQa4K&u=z`
    - Default behavior: `https://band-songs.example.com/` (uses default band and empty user)
    - React Router integration: Parameters persist across navigation
    - State management: Parameters override default application state

#### 5.5 External Integrations

- **GrooveScribe** embedding for drum tablature
- **YouTube** embedding for music references
- **Export capabilities** for setlists and song data

### 6. Data Models

#### 6.1 Song Model

```typescript
interface Song {
    id: string;
    title: string;
    artist: string;
    length: number; // in seconds
    startsWith: StartsWith; // enum
    groove: string; // GrooveScribe URL
    ytMusic: string; // YouTube video ID
    notes: string; // drummer notes
    pad: DrumPad; // enum
    practice?: boolean;
    bands: string[]; // band IDs
    createdAt: Date;
    updatedAt: Date;
}
```

#### 6.2 Gig Model

```typescript
interface Gig {
    id: string;
    date: Date;
    venue: string;
    setOne: string[]; // song IDs
    setTwo: string[]; // song IDs
    pocket: string[]; // song IDs
    bandId: string;
    createdAt: Date;
    updatedAt: Date;
}
```

#### 6.3 Band Model

```typescript
interface Band {
    id: string;
    name: string;
    description: string;
    members: string[]; // user IDs
    createdAt: Date;
    updatedAt: Date;
}
```

### 7. User Experience Requirements

#### 7.1 Performance

- **Fast loading** with code splitting
- **Optimistic updates** for better perceived performance
- **Offline support** with service workers
- **Mobile responsiveness** for on-stage use

#### 7.2 Accessibility

- **WCAG 2.1 AA compliance**
- **Keyboard navigation** support
- **Screen reader compatibility**
- **High contrast mode** support

#### 7.3 Usability

- **Intuitive navigation** with clear visual hierarchy
- **Consistent interaction patterns**
- **Error handling** with helpful messages
- **Undo/redo functionality** where appropriate

## User Stories

### 8. Epic: Song Management

- As a musician, I want to add new songs to my band's repertoire
- As a drummer, I want to embed drum tablature for reference during practice
- As a band member, I want to flag songs that need more practice
- As a user, I want to search and filter songs by various criteria

### 9. Epic: Gig Planning

- As a band leader, I want to create setlists for upcoming gigs
- As a performer, I want to view setlists in a clean, performance-friendly format
- As a band member, I want to see the total timing for each set
- As a user, I want to reorder songs within setlists easily

### 10. Epic: Collaboration

- As a band member, I want to see updates from other members in real-time
- As a user, I want to work with multiple bands using the same account
- As a band leader, I want to control who can edit band information

## Success Metrics

### 11. Key Performance Indicators

- **User Engagement**: Active users per month
- **Feature Adoption**: Percentage of users using core features
- **Performance**: Page load times under 2 seconds
- **Reliability**: 99.9% uptime
- **User Satisfaction**: Positive feedback scores

## Development Phases

### 12. Phase 1: Core Functionality (MVP)

- Basic song CRUD operations
- Simple gig creation
- User authentication
- Band selection

### 13. Phase 2: Enhanced Features

- Advanced setlist builder
- GrooveScribe integration
- YouTube embedding
- Mobile optimization

### 14. Phase 3: Collaboration & Polish

- Real-time updates
- Multi-user editing
- Advanced search and filtering
- Performance optimizations

## Constraints and Assumptions

### 15. Technical Constraints

- Must work with existing Firebase backend
- Must support modern browsers (Chrome, Firefox, Safari, Edge)
- Must be responsive across devices

### 16. Business Constraints

- Development timeline: 3-4 months for MVP
- Budget considerations for external service integrations
- Need to maintain feature parity with existing Ember app

## Appendix

### 17. Enum Definitions

#### StartsWith Enum

```typescript
enum StartsWith {
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

const StartsWithMap = new Map<StartsWith, string>([
    [StartsWith.All, 'Drums count in'],
    [StartsWith.RhythmGuitar, 'Rhythm guitar'],
    [StartsWith.Drums, 'Drums'],
    [StartsWith.DrumsAndKeys, 'Drums and keys'],
    [StartsWith.LeadGuitar, 'Lead guitar'],
    [StartsWith.LeadAndVocals, 'Lead guitar and vocals'],
    [StartsWith.DrumsAndBass, 'Drums and bass'],
    [StartsWith.DrumsAndGuitar, 'Drums and guitar'],
    [StartsWith.Bass, 'Bass'],
    [StartsWith.Guitars, 'Guitars'],
    [StartsWith.Vocals, 'Vocals'],
    [StartsWith.Keys, 'Keys'],
    [StartsWith.Trumpet, 'Trumpet']
]);
```

#### DrumPad Enum

```typescript
enum DrumPad {
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

const DrumPadMap = new Map<DrumPad, string>([
    [DrumPad.None, 'None'],
    [DrumPad.Cowbell, 'Cowbell (#641)'],
    [DrumPad.Claps, 'Claps (#800)'],
    [DrumPad.Tambourine, 'Tambourine (#724)'],
    [DrumPad.BellTree, 'Tree chime (#631)'],
    [DrumPad.China, 'China Crash'],
    [DrumPad.Edrum, 'EDrum'],
    [DrumPad.VibraSlap, 'VibraSlap (#753)'],
    [DrumPad.Clave, 'Clave (#736)']
]);
```

#### ActionMode Enum

```typescript
enum ActionMode {
    Perform = 0,
    Rehearse = 1,
    Practice = 2,
    Edit = 3,
    Flag = 4
}

const ActionModeMap = new Map<ActionMode, string>([
    [ActionMode.Perform, 'Perform'],
    [ActionMode.Rehearse, 'Rehearse'],
    [ActionMode.Practice, 'Practice'],
    [ActionMode.Edit, 'Edit'],
    [ActionMode.Flag, 'Flag']
]);
```

#### User Enum

```typescript
enum User {
    None = '',
    Me = 'z',
    Vocals = 'vocals',
    Guitars = 'guitars'
}
```

### 18. Design References

- Original Ember app uses Elastic UI components
- Clean, professional design suitable for musicians
- Dark mode support for low-light performance environments
- Card-based layout for song organization
- Responsive grid system for various screen sizes

---

_This PRD serves as the foundation for developing a modern React-based band management application that maintains the core functionality of the original Ember app while providing enhanced user experience and modern web capabilities._
