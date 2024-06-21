import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/navbar";

function App() {
    return (
        <div className="flex flex-col items-center hero min-h-[100dvh]">
            <Nav />

            <Outlet />

            <Footer />
        </div>
    );
}

export default App;
