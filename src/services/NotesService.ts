
import { EmptyNote, type Note } from "../models";

// Servicio para manejar las notas
export class NotesService {
    private notes: Note[] = [];
    private ApiUrl: string = "http://localhost:4000/api/notes";
    
    constructor() {
        this.notes.push(EmptyNote);
    }

    async getNotes(): Promise<Note[] | undefined> {
        try {
            const response = fetch(this.ApiUrl)
                .then(res => res.json())
                .then(data => {
                    this.notes = data.map((note: Note) => ({
                        id: note.id,
                        title: note.title,
                        content: note.content,
                        createdAt: new Date(note.createdAt)
                    }))
                }).then(() => this.notes);
            return response;
        } catch(err) {
            console.error("Error al obtener las notas:", err);
        }
    }

    // Obtener una nota por ID
    async getNoteById(id: string): Promise<Note | undefined> {
        try {
            const response = fetch(`${this.ApiUrl}/${id}`)
                .then(res => res.json())
                .then(data => ({
                    id: data.id,
                    title: data.title,
                    content: data.content,
                    createdAt: new Date(data.createdAt)
                }))
                .then(note => note || undefined);
            return response;
        } catch (err) {
            console.error("Error al obtener la nota:", err);
            return Promise.resolve(undefined);
        }
    }

    // Crear una nueva nota
    async createNote(note: Note): Promise<Note | undefined> {
        try {
            const response = fetch(this.ApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            .then(res => res.json())
            .then(data => ({
                id: data.id,
                title: data.title,
                content: data.content,
                createdAt: new Date(data.createdAt)
            }))
            .then(newNote => {
                this.notes.push(newNote);
                return newNote;
            });
            return response;
        } catch (err) {
            console.error("Error al crear la nota:", err);
            return Promise.resolve(undefined);
        }
    }

    // Actualizar una nota existente
    async updateNote(note: Note): Promise<Note | undefined> {
        try {
            const response = fetch(`${this.ApiUrl}/${note.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            .then(res => res.json())
            .then(data => ({
                id: data.id,
                title: data.title,
                content: data.content,
                createdAt: new Date(data.createdAt)
            }))
            .then(updatedNote => {
                const index = this.notes.findIndex(n => n.id === updatedNote.id);
                if (index !== -1) {
                    this.notes[index] = updatedNote;
                }
                return updatedNote;
            });
            return response;
        } catch (err) {
            console.error("Error al actualizar la nota:", err);
            return Promise.resolve(undefined);
        }
    }

    // Eliminar una nota
    async deleteNote(id: string): Promise<Note | undefined> {
        try {
            const response = fetch(`${this.ApiUrl}/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => ({
                id: data.id,
                title: data.title,
                content: data.content,
                createdAt: new Date(data.createdAt)
            }))
            .then(note => {
                const index = this.notes.findIndex(n => n.id === note.id)
                this.notes.splice(index, 1);
                return note;
            })
            return response;
        } catch(err) {
            console.log("Error al borrar la nota", err)
            return Promise.resolve(undefined) 
        }
    }
}