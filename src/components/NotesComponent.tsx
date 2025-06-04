import {  useEffect } from "react";
import { NotesService } from "../services/NotesService";
import { useNotes } from "../context/useNotes";

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
        <div>
        <h1 className="text-3xl font-semibold text-center md:text-4xl md:text-start p-5">Notes</h1>
            <ul className="min-w-[300px] grid gap-4 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {notes.map((note, index) => (
                    <li key={index} className="relative min-h-[150px] p-5 flex flex-col justify-between gap-3 bg-black bg-opacity-75 rounded-xl ">
                        <h3 className="font-bold text-start">{note.title}</h3>
                        <p className="text-sm text-start text-gray-300 mb-2">{note.content}</p>
                        <small className="text-xs text-end self-end">{new Date(note.createdAt).toLocaleDateString()}</small>

                        <div className="absolute bottom-1 left-7 hover:text-blue-700 transition-colors">
                            <button className="p-3" onClick={() => {
                            setEditingNote(note);
                            handleEdit();
                            }}>
                            <i className="ri-pencil-line"></i>
                            </button>
                        </div>

                        <div className="absolute bottom-1 left-1 hover:text-red-500 transition-colors">
                            <button className="p-3" onClick={() => handleDelete(note.id)}>
                            <i className="ri-close-line"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}