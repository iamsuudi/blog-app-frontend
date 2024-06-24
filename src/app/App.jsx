import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/navbar";

function App() {
    return (
        <>
            <div className="flex flex-col items-center min-h-[100dvh] from-black via-slate-800 to-black bg-gradient-to-tr w-full">
                <Nav />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default App;
