export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export const EmptyNote: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
}

export interface NoteData{
    title: string;
    content: string;
}