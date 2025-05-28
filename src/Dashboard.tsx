
export const Dashboard = () => {
    return (
        <>
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col items-center gap-4 p-4 justify-start h-screen 
            fixed left-0 top-0 max-w-[200px] bg-gray-500 max-sm:w-[70px]">
                <h3>Note App</h3>
                <button className="m-2 p-2 bg-gray-700 rounded-md">
                    <a href="note/new" className="text-white">New Note</a>
                </button>
            </div>
            <div>
                <h1 className="font-bold text-4xl mb-2">Your Notes</h1>
                <ul className="flex flex-col items-start justify-start md:flex-row md:items-center md:justify-center">
                    <li className="m-2 p-2 bg-gray-700 rounded-md min-w-[150px] min-h-[100px]">
                        <a href="note/1">Note 1</a>
                    </li>
                    <li className="m-2 p-2 bg-gray-700 rounded-md w-xl min-w-[150px] min-h-[100px]">
                        <a href="note/2">Note 2</a>
                    </li>
                    <li className="m-2 p-2 bg-gray-700 rounded-md w-xl min-w-[150px] min-h-[100px]">
                        <a href="note/3">Note 3</a>
                    </li>
                    <li className="m-2 p-2 bg-gray-700 rounded-md w-xl min-w-[150px] min-h-[100px]">
                        <a href="note/3">Note 4</a>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}