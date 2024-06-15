import { NavLink, Outlet } from "react-router-dom";

function App() {
    return (
        <div className="flex flex-col items-center">
            <p className=" text-slate-700 text-5xl font-black py-5">
                <NavLink to={'/'}>Only Members App</NavLink>
            </p>

            <Outlet />
        </div>
    );
}

export default App;
