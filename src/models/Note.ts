export interface Note {
    _id: string;
    title: string;
    content: string;
    createdAt: Date;
}

export const EmptyNote: Note = {
    _id: '',
    title: '',
    content: '',
    createdAt: new Date(),
}
