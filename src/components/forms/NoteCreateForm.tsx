import { EmptyNote, type Note } from "../../models";
import { useEffect, useState } from "react";
import { NotesService } from "../../services/NotesService";
import { useNotes } from "../../context/useContext";

interface Props {
    id?: string
    onSuccess: () => void
}

const NoteCreateForm = ({id, onSuccess }: Props) => {
    const [newNote, setNewNote] = useState<Note>(EmptyNote);
    const { editingNote, setEditingNote, fetchNotes} = useNotes();
    const notesService = new NotesService();

    useEffect(() => {
        // Si hay una nota para editar, rellenamos el estado del formulario con ella
        if (editingNote) {
        setNewNote(editingNote);
        } else {
        setNewNote(EmptyNote);
        }
    }, [editingNote]);

      async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (editingNote) {
            const updatedNote = await notesService.updateNote(editingNote.id, {
                title: newNote.title,
                content: newNote.content
            });

            if (updatedNote) {
                fetchNotes();
                setEditingNote(null); // Salimos del modo edición
                onSuccess();
            }

        } else {
            const createdNote = await notesService.createNote({
                title: newNote.title,
                content: newNote.content
            });
            if (createdNote) {
                fetchNotes();
                onSuccess();
            }
        }
    }
    
    return (
        // Rellenar el formulario si hay un id
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-2">
            {id && <p className="text-white">Editing note</p> || <p className="text-white">Write your note</p>}
            <input 
                className="p-1 rounded-md" 
                type="text" name="title" 
                value={newNote.title} 
                placeholder="title" 
                onChange={(event) => {setNewNote({ ...newNote, title: event.target.value })}} 
            />
            <textarea 
                className="p-1 rounded-md mb-4" 
                rows={4} name="content" 
                value={newNote.content} 
                placeholder="content" 
                onChange={(event) => {setNewNote({ ...newNote, content: event.target.value })}} />
            <button className="p-1 bg-blue-700 rounded-md" type="submit">Save</button>
        </form>
    )
}
export default NoteCreateForm;