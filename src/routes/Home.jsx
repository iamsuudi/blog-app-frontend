import Hero from "../components/hero";

export default function Home() {
    return (
        <div className="flex flex-col items-center w-full max-w-screen-xl gap-20 py-40">
            <Hero />
        </div>
    );
}
