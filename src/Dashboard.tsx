import { NotesComponent } from './components/NotesComponent';

export const Dashboard = () => {
    return (
        <>
        <div className="flex flex-row justify-center items-center w-full">
            <div className="flex flex-col items-center gap-4 p-4 justify-start h-screen 
            relative left-0 top-0 bg-black">
                <h3>Note App</h3>
                <button className="m-2 p-2 rounded-md bg-blue-700">
                    <a href="note/new" className="text-white">New Note</a>
                </button>
            </div>
            <div className="flex flex-col justify-start h-auto">
                <NotesComponent />
            </div>
        </div>
        </>
    )
}