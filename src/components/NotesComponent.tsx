import {  useEffect } from "react";
import { NotesService } from "../services/NotesService";
import { useNotes } from "../context/useContext";

export const NotesComponent = () => {
    const { notes, setNotes, setIsModalOpen, setEditingNote } = useNotes();
    const notesService = new NotesService();

    // Función reutilizable para cargar notas
    async function loadNotes() {
        const notesFetched = await notesService.getNotes();
        if (notesFetched) {
            setNotes(notesFetched.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
        }
    }

    // Cargar las notas al montar el componente
    useEffect(() => {
        loadNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id: string) => {
        await notesService.deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEdit = async () => {
        setIsModalOpen(true);
    };

    return (
        <div className="p-4">
            <h2 className="text-3xl mb-2 text-center p-0 mt-4 md:text-start md:p-5 md:text-4xl">Your Notes</h2>
            { notes && notes.length === 0 && <p>No notes found</p> }
            { notes && (
                <ul className="list-none flex flex-col gap-2 p-5 w-auto md:flex-grid md:grid-auto-flow ">
                    {notes.map((note, index) => (                        
                        <li key={index} className="flex flex-col gap-3 bg-black bg-opacity-75 rounded-xl p-5 relative">
                            <h3 className="font-bold text-start">{note.title}</h3>
                            <p className="text-sm text-start mb-2">{note.content}</p>
                            <small className="text-xs text-end">{note.createdAt.toLocaleDateString()}</small>
                            <div className="absolute top-1 right-8 hover:text-blue-700 transition-colors animation-ease-in">
                                <button className="p-3" onClick={() => {
                                    setEditingNote(note);
                                    handleEdit();
                                    }}>
                                    <i className="ri-pencil-line"></i>
                                </button>
                            </div>
                            <div className="absolute top-1 right-1 hover:text-red-500 transition-colors animation-ease-in">
                                <button className="p-3" onClick={() => handleDelete(note.id)}>
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