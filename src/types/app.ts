// Application-level enums and types (not related to Firestore schema)

export enum User {
    None = '',
    Me = 'z',
    Vocals = 'vocals',
    Guitars = 'guitars'
}

export enum ActionMode {
    Perform,
    Rehearse,
    Practice,
    Edit,
    Flag
}
