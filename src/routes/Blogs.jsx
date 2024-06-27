import { Link, useNavigate } from "react-router-dom";
import Blog from "../components/blog";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user.api";
import { useEffect } from "react";
import { Button, Spinner } from "@radix-ui/themes";
import { getBlogs } from "../services/blog.api";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Blogs() {
    const navigate = useNavigate();

    const user = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const blogs = useQuery({
        queryKey: ["blogs"],
        queryFn: getBlogs,
        retry: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (user.isError) navigate("/auth/signin");
        if (blogs.isError) navigate("/auth/signin");
    }, [user.isLoading, user.isError, blogs.isError, blogs.isLoading]);

    if (blogs.isLoading) return <Spinner size={"3"} />;

    return (
        <div className="flex flex-col items-center justify-center w-full gap-20 py-40">
            <Button color="blue" variant="solid">
                <Link
                    to={"/blog-form"}
                    className="flex items-center gap-3 p-2 font-black w-fit hover:cursor-cell hover:text-white"
                >
                    Add Post <PlusIcon />
                </Link>
            </Button>
            <section className="flex flex-wrap items-center justify-center w-full max-w-screen-xl gap-10 p-5 xl:justify-start">
                {blogs.data.map((blog) => {
                    return <Blog key={blog.id} blog={blog} />;
                })}
            </section>
        </div>
    );
}
