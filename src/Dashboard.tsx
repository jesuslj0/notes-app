import { NotesComponent } from './components/NotesComponent';
import NoteCreateForm from "./components/forms/NoteCreateForm";
import { useAuth } from './context/useAuth';
import { useNotes } from './context/useNotes';
import { EmptyNote } from './models';

export const Dashboard = () => {
    const { isModalOpen, setIsModalOpen, fetchNotes, editingNote, setEditingNote } = useNotes();
    const { logout } = useAuth();

    function toggleModal() {
        setIsModalOpen(!isModalOpen);
    }

    function toggleMenu() {
        const menu = document.getElementById('menu')
        menu?.classList.toggle('hidden')

        // Ver el elemento openMenu
        const openMenu = document.getElementById('openMenu')
        openMenu?.classList.toggle('hidden')
    }

    async function handleLogout() {
        await logout();
    }

    return (
        <>
        <div className="flex flex-row h-full justify-center items-start w-full md:flex-col md:w-100vw md:items-center">
            <div id="openMenu" className='p-4 absolute top-3 left-3 hidden'>
                <button onClick={() => toggleMenu()}>
                    <i className="ri-menu-line text-white"></i>
                </button>
            </div>
            <div
                id="menu"
                className="flex flex-col justify-between h-screen w-1/4 p-4 bg-black text-white sticky top-0 left-0 z-50
                            md:flex-row md:items-center md:justify-between md:w-full md:h-auto"
                >
                {/* Parte superior del menú */}
                <div className="flex flex-col items-center gap-4 md:flex-row md:items-center">
                    {/* Botón cerrar menú en móvil */}
                    <div id="closeMenu" className="p-3 md:hidden">
                    <button onClick={toggleMenu}>
                        <i className="ri-menu-fold-line text-white"></i>
                    </button>
                    </div>

                    {/* Título */}
                    <h3 className="text-blue-500 md:ml-5 text-center">Note App</h3>

                    {/* Botón crear nota */}
                    <button
                    className="w-8 h-8 rounded-md bg-blue-700 md:ml-4 hover:bg-blue-500 transition-all ease-in-out duration-300"
                    onClick={toggleModal}
                    >
                    <i className="ri-add-large-fill"></i>
                    </button>
                </div>

                {/* Botón de Logout */}
                <div className="mt-auto md:mt-0 md:mr-4 flex flex-row justify-center">
                    <button onClick={handleLogout} className="rounded-md bg-red-700 text-sm hover:bg-red-600 transition-all ease-in-out duration-300 p-2">
                    Logout
                    </button>
                </div>
                </div>

            <div className="flex flex-col justify-center items-center h-auto p-4">
                { isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                        <div className="relative w-4/5 md:w-3/4 flex flex-col gap-4 bg-black p-4 rounded-lg">
                            <button className="absolute top-0 right-0 p-2"onClick={() => {
                                setIsModalOpen(false);
                                setEditingNote(EmptyNote);
                            }}>
                                <i className="ri-close-line text-white"></i>
                            </button>
                            <NoteCreateForm id={editingNote?.id} onSuccess={async () => {
                                setIsModalOpen(false);
                                fetchNotes();
                            }}/>
                        </div>
                    </div>
                )}
                <NotesComponent />
            </div>
        </div>
        </>
    )
}