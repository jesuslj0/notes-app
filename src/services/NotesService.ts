
import { EmptyNote, type Note, type NoteData } from "../models";

// Servicio para manejar las notas
export class NotesService {
    private notes: Note[] = [];
    private ApiUrl: string = "http://localhost:4000/api/notes";
    
    constructor() {
        this.notes.push(EmptyNote);
    }

    async getNotes(): Promise<Note[] | undefined> {
        try {
            const response = await fetch(this.ApiUrl, {
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            this.notes = data.map((note: Note) => ({
                id: note.id,
                title: note.title,
                content: note.content,
                isFixed: note.isFixed,
                createdAt: new Date(note.createdAt),
                updatedAt: note.updatedAt ? new Date(note.updatedAt) : new Date(),
            }));
            return this.notes;
        } catch(err) {
            console.error("Error al obtener las notas:", err);
        }
    }

    // Obtener una nota por ID
    async getNoteById(id: string): Promise<Note | undefined> {
        try {
            const response = await fetch(`${this.ApiUrl}/${id}`,{
                method: "GET",
                credentials: 'include'
            });
            const data = await response.json();
            return {
                id: data.id,
                title: data.title,
                content: data.content,
                isFixed: data.isFixed,
                createdAt: new Date(data.createdAt),
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
            };
        } catch (err) {
            console.error("Error al obtener la nota:", err);
            return undefined;
        }
    }

    // Crear una nueva nota
    async createNote({ title, content, isFixed, updatedAt = null }: NoteData): Promise<Note | undefined> {
        try {
            const response = await fetch(this.ApiUrl, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, isFixed, updatedAt })
            });
            const data = await response.json();
            return {
                id: data.id,
                title: data.title,
                content: data.content,
                isFixed: data.isFixed,
                createdAt: new Date(data.createdAt),
                updatedAt: data.updatedAt,
            };
        } catch (err) {
            console.error("Error al crear la nota:", err);
            return undefined;
        }
    }

    // Actualizar una nota existente
    async updateNote(id: string, { title, content, isFixed, updatedAt }: NoteData): Promise<Note | undefined> {
        try {
            const response = await fetch(`${this.ApiUrl}/${id}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: title, content: content, isFixed: isFixed, updatedAt: updatedAt })
            });
            const data = await response.json();
            const updatedNote = {
                id: data.id,
                title: data.title,
                content: data.content,
                isFixed: data.isFixed,
                createdAt: new Date(data.createdAt),
                updatedAt: new Date(data.updatedAt)
            };
            const index = this.notes.findIndex(n => n.id === updatedNote.id);
            if (index !== -1) {
                this.notes[index] = updatedNote;
            }
            return updatedNote;
        } catch (err) {
            console.error("Error al actualizar la nota:", err);
            return undefined;
        }
    }

    // Eliminar una nota
    async deleteNote(id: string): Promise<Note | undefined> {
        try {
            const response = await fetch(`${this.ApiUrl}/${id}`, {
                method: "DELETE",
                credentials: 'include'
            });
            const data = await response.json();
            const note = {
                id: data.id,
                title: data.title,
                content: data.content,
                isFixed: data.isFixed,
                createdAt: new Date(data.createdAt),
                updatedAt: data.updatedAt ? new Date(data.updatedAt) : null,
            };
            const index = this.notes.findIndex(n => n.id === note.id);
            if (index !== -1) {
                this.notes.splice(index, 1);
            }
            return note;
        } catch(err) {
            console.log("Error al borrar la nota", err)
            return undefined; 
        }
    }
}