import { NotesComponent } from './components/NotesComponent';
import NoteCreateForm from "./components/forms/NoteCreateForm";
import { useNotes } from './context/useContext';
import { EmptyNote } from './models';

export const Dashboard = () => {
    const { isModalOpen, setIsModalOpen, fetchNotes, editingNote, setEditingNote } = useNotes();

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

    return (
        <>
        <div className="flex flex-row h-full justify-center items-start w-full md:flex-col md:w-100vw md:items-center">
            <div id="openMenu" className='p-4 absolute top-3 left-3 hidden'>
                <button onClick={() => toggleMenu()}>
                    <i className="ri-menu-line text-white"></i>
                </button>
            </div>
            <div id="menu" className="flex flex-col items-center h-screen pb-auto gap-4 p-4 justify-start w-1/4 sticky top-0
            md:flex-row md:items-center md:w-full md:h-auto bg-black z-50">
            <div id="closeMenu" className="p-3 bg-black md:hidden">
                <button onClick={() => toggleMenu()}>
                    <i className="ri-menu-fold-line text-white"></i>
                </button>
            </div>
                <h3 className="text-blue-500 text-center md:ml-5">Note App</h3>
                <button className="mt-4 w-8 h-8 rounded-md md:mt-0 bg-blue-700" onClick={() => toggleModal()}>
                    <i className="ri-add-large-fill"></i>
                </button>
            </div>
            <div className="flex flex-col justify-center items-center h-auto">
                { isModalOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-60 flex items-center justify-center z-50">
                        <div className="relative w-4/5 md:w-1/3 flex flex-col gap-4 bg-black p-4 rounded-lg">
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