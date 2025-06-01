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


    function deleteNote(id: string) {
        notesService.deleteNote(id)
        console.log('Botón de eliminar pulsado')
    }

    return (
        <div className="p-4">
            <h2 className="text-3xl mb-2 text-center p-0 mt-4 md:text-start md:p-5">Your Notes</h2>
            { notes && notes.length === 0 && <p>No notes found</p> }
            { notes && (
                <ul className="list-none flex flex-col gap-2 p-5 w-auto md:flex-grid md:grid-auto-flow ">
                    {notes.map((note, index) => (
                        <li key={index} className="flex flex-col gap-2 border-[1px] border-white rounded-xl p-5 relative">
                            <h3 className="font-bold text-start">{note.title}</h3>
                            <p className="text-sm text-start mb-2">{note.content}</p>
                            <small className="text-xs text-end">{note.createdAt.toLocaleDateString()}</small>
                            <div className="absolute top-2 right-2">
                                <button className="p-3" onClick={() => console.log("Boton de eliminar pulsado, Id: ", note?._id)}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}