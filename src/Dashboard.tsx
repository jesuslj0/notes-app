import { NotesComponent } from './components/NotesComponent';

export const Dashboard = () => {

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
            <div id="openMenu" className='p-4 absolute top-3 left-3 mb:hidden hidden'>
                <button onClick={() => toggleMenu()}>
                    <i className="ri-menu-line text-white"></i>
                </button>
            </div>
            <div id="menu" className="flex flex-col items-center h-screen pb-auto gap-4 p-4 justify-start w-1/4 sticky top-0
            md:flex-row md:items-center md:w-full md:h-auto bg-black">
            <div id="closeMenu" className="p-3 bg-black md:hidden">
                <button onClick={() => toggleMenu()}>
                    <i className="ri-menu-fold-line text-white"></i>
                </button>
            </div>
                <h3 className="text-blue-400 text-center md:ml-5">Note App</h3>
                <button className="mt-4 w-10 h-10 rounded-md md:mt-0 bg-blue-700">
                    <a href="note/new" className="text-white"><i className="ri-add-large-fill"></i></a>
                </button>
            </div>
            <div className="flex flex-col justify-center items-center h-auto">
                <NotesComponent />
            </div>
        </div>
        </>
    )
}