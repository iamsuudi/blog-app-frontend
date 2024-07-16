import { Outlet } from "react-router-dom";
import Footer from "../components/footer";
import Nav from "../components/navbar";

function App() {
    return (
        <>
            <div
                className="flex flex-col items-center min-h-[100dvh] w-full"
                style={{
                    background: "URL('bg.svg')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                }}
            >
                <Nav />
                <Outlet />
                <Footer />
            </div>
        </>
    );
}

export default App;
