export interface Note {
    id: string;
    title: string;
    content: string;
    isFixed: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}

export const EmptyNote: Note = {
    id: '',
    title: '',
    content: '',
    isFixed: false,
    createdAt: new Date(),
    updatedAt: null,
}

export interface NoteData{
    title: string;
    content: string;
    isFixed: boolean;
    updatedAt: Date | null;
}