import { useState, useEffect } from "react";
import { NotesService } from "../services/NotesService";
import type { Note } from "../models";

export const NotesComponent = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const notesService = new NotesService();

    useEffect(() => {
        notesService.getNotes().then(notes => {
            if (notes) {
                setNotes(notes);
            }
        });
    });

    return (
        <div className="p-4">
            <h2 className="text-3xl mb-4 text-center p-0 md:text-start md:p-5">Your Notes</h2>
            { notes && notes.length === 0 && <p>No notes found</p> }
            { notes && (
                <ul className="list-none flex flex-col gap-2 p-5 md:flex-row md:gap-5">
                    {notes.map((note, index) => (
                        <li key={index} className="flex flex-col gap-2 border-[1px] border-white rounded-xl p-5">
                            <h3 className="font-bold text-start">{note.title}</h3>
                            <p className="text-sm text-start mb-2">{note.content}</p>
                            <small className="text-xs text-end">{note.createdAt.toLocaleDateString()}</small>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}