import { useNavigate } from "react-router-dom";
import Blog from "../components/blog";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user.api";
import { useEffect } from "react";
import { Spinner } from "@radix-ui/themes";
import { getBlogs } from "../services/blog.api";

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
    const navigate = useNavigate();

    const user = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const blogsRaw = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (user.isError) navigate("/auth/signin");
        if (blogsRaw.isError) navigate("/auth/signin");
    }, [user.isLoading, user.isError, blogsRaw.isError, blogsRaw.isLoading]);

    if (blogsRaw.isLoading) return <Spinner size={"3"} />;

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
