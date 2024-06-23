import Hero from "../components/hero";
import Blogs from "./Blogs";

export default function Home() {
    return (
        <div className="py-40 ">
            <Hero />
            <Blogs />
        </div>
    );
}
