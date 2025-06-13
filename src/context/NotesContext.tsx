import type React from "react";
import {type Note} from "../models";
import { createContext, useState } from "react";
import { NotesService } from "../services/NotesService";

// Tipo del contexto 
interface NoteContext {
    notes: Note[];
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    fetchNotes: () => void;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editingNote: Note | null;
    setEditingNote: (note: Note | null) => void;
    fixedNotes: Note[];
    setFixedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

// Contexto para notas
const NotesContext = createContext<NoteContext | undefined>(undefined);

// Proveedor del contexto
export function NotesContextProvider({ children }: { children: React.ReactNode }) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [fixedNotes, setFixedNotes] = useState<Note[]>([]);
    const notesService = new NotesService();

    async function fetchNotes() {
        const notesFetched = await notesService.getNotes();
        if (notesFetched) {
            setNotes(notesFetched.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
            setFixedNotes(notesFetched.filter(note => note.isFixed));
        } else {
            console.log('Error fetching notes in context');
        }
    }

    return (
        <NotesContext.Provider value={{ notes, setNotes, fetchNotes, isModalOpen, setIsModalOpen, editingNote, setEditingNote, fixedNotes, setFixedNotes }}>
            {children}
        </NotesContext.Provider>
    );
}

export default NotesContext;