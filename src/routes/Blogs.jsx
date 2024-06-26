import Blog from "../components/blog";

const blogs = [
    {
        id: 1,
        // title: "CSS Variables (CSS Custom properties) for Beginners",
        title: `Use the ghost variant to display a button without chrome. Ghost buttons behave like text in layout, as they use a negative margin to optically align themselves against their siblings while maintaining the padding in active and hover states.`,
        description:
            "Use the ghost variant to display a button without chrome.",
        tags: ["javascript", "react", "web"],
    },
    {
        id: 2,
        title: "bkhoiyluigtyfdrd",
        description: "qwertyuiopiuytrst",
        tags: ["html", "react", "database"],
    },
    {
        id: 3,
        title: "bkhoiyluigtyfdrd",
        description: "qwertyuiopiuytrst",
        tags: ["python", "angular", "typscript"],
    },
];

export default function Blogs() {
    return (
        <div className="flex justify-center w-full py-40">
            <section className="flex flex-wrap items-center justify-center w-full max-w-screen-xl gap-10 p-5 xl:justify-start">
                {blogs.map((blog) => {
                    return <Blog key={blog.id} blog={blog} />;
                })}
            </section>
        </div>
    );
}
