import {
    AspectRatio,
    Button,
    Card,
    Spinner,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogs, updateBlog, uploadThumbnail } from "../services/blog.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../services/user.api";
import { useEffect, useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

export default function BlogEdit() {
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

    const queryClient = useQueryClient();

    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [tag, setTag] = useState("");
    const [thumnailIsChanged, setThumbnailIsChanged] = useState(false);
    const [thumbnailPath, setThumbnailPath] = useState("");

    /* eslint react-hooks/exhaustive-deps: 0 */
    useEffect(() => {
        if (user.isError) navigate("/auth/signin");
        if (blogs.isError) navigate("/auth/signin");
        if (blogs.data && user.data) {
            const blog = blogs.data.find((blog) => blog.id === blogId);

            if (blog.user.id !== user.data.id) navigate("/auth/signin");
            else {
                setBlog(blog);
                setThumbnailIsChanged(blog.thumbnail !== "");

                const { protocol, hostname } = window.location;
                setThumbnailPath(
                    `${protocol}//${hostname}:3001/${blog.thumbnail}`,
                );
            }
        }
    }, [user.isLoading, user.isError, blogs.isLoading, blogs.isError]);

    const updatePostHandler = async (e) => {
        e.preventDefault();

        const formObject = Object.fromEntries(new FormData(e.target));
        const formThumbnail = new FormData(e.target);
        formObject.tags = blog.tags.map((tag) => ({ content: tag.content }));
        delete formObject.thumbnail;

        try {
            let updatedBlog = await updateBlog(blogId, formObject);
            if (thumnailIsChanged) {
                updatedBlog = await uploadThumbnail(blogId, formThumbnail);
            }
            queryClient.setQueryData(
                ["blogs"],
                blogs.data.map((blog) => {
                    if (blog.id === blogId) return updatedBlog;
                    return blog;
                }),
            );
            navigate("/blogs");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (user.isLoading || blogs.isLoading) return <Spinner size={"3"} />;

    if (blog) {
        return (
            <div className="flex justify-center w-full px-5 py-40">
                <form
                    action=""
                    method="post"
                    onSubmit={updatePostHandler}
                    className="w-full max-w-screen-sm "
                    encType="multipart/form-data"
                >
                    <Card className="flex flex-col items-center w-full gap-5 px-5 py-10">
                        <h1 className="mb-10 text-5xl font-bold">Edit</h1>

                        <label className="flex flex-col items-center w-full gap-3">
                            <Text className="w-full font-black min-w-72">
                                Title
                            </Text>
                            <TextArea
                                placeholder="Blog Title"
                                required
                                type="text"
                                name="title"
                                variant="soft"
                                color="gray"
                                minLength={"10"}
                                maxLength={"72"}
                                className="w-full"
                                defaultValue={blog.title}
                            />
                        </label>

                        <label className="flex flex-col items-center w-full gap-3">
                            <Text className="w-full font-black min-w-72">
                                Description
                            </Text>
                            <TextArea
                                placeholder="Description"
                                // required
                                type="text"
                                name="description"
                                variant="soft"
                                color="gray"
                                className="w-full"
                                defaultValue={blog.description}
                            />
                        </label>

                        <label className="flex flex-col items-center w-full gap-3">
                            <Text className="w-full font-black min-w-72">
                                URL
                            </Text>
                            <TextField.Root
                                placeholder="URL"
                                // required
                                type="text"
                                name="url"
                                variant="soft"
                                color="gray"
                                className="w-full"
                                defaultValue={blog.url}
                            />
                        </label>

                        <label className="flex flex-col items-center w-full gap-3">
                            <Text className="w-full font-black min-w-72">
                                Thumbnail
                            </Text>
                            <input
                                // required
                                type="file"
                                name="thumbnail"
                                accept="image/,.png"
                                className="w-full text-sm"
                                onChange={({ target }) => {
                                    const img = target.files[0];
                                    const imgUrl = URL.createObjectURL(img);

                                    setThumbnailPath(imgUrl);
                                    setThumbnailIsChanged(true);
                                }}
                                // defaultValue={blog.thumbnail}
                            />
                        </label>

                        <AspectRatio ratio={16 / 8}>
                            <img
                                src={thumbnailPath}
                                alt="Thumbnail"
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "0.8rem",
                                }}
                            />
                        </AspectRatio>

                        <label className="flex flex-col items-center w-full gap-3">
                            <Text className="w-full font-black min-w-72">
                                Tags
                            </Text>
                            <div className="flex items-center w-full gap-0 min-w-72">
                                <TextField.Root
                                    placeholder="Type tag here"
                                    // required
                                    type="text"
                                    name="tags"
                                    value={tag}
                                    onChange={({ target }) =>
                                        setTag(target.value)
                                    }
                                    variant="soft"
                                    color="gray"
                                    className="w-full rounded-r-none max-w-60"
                                />
                                <Button
                                    color="gray"
                                    disabled={tag.length < 3}
                                    onClick={() => {
                                        setBlog({
                                            ...blog,
                                            tags: blog.tags.concat({
                                                content: tag,
                                                _id: Date.now(),
                                            }),
                                        });
                                        setTag("");
                                    }}
                                    className="rounded-l-none hover:cursor-pointer"
                                >
                                    <PlusIcon />
                                </Button>
                            </div>
                        </label>

                        <div className="flex flex-wrap w-full gap-3">
                            {blog.tags.map((tag) => {
                                return (
                                    <Text
                                        color="gray"
                                        variant="soft"
                                        size={"2"}
                                        key={tag._id}
                                        className="flex items-center gap-2 px-2 py-1 bg-gray-700 rounded-lg"
                                    >
                                        <Text># {tag.content}</Text>
                                        <button
                                            className="text-red-500 scale-90 hover:scale-75"
                                            onClick={() => {
                                                setBlog({
                                                    ...blog,
                                                    tags: blog.tags.filter(
                                                        (t) =>
                                                            t._id !== tag._id,
                                                    ),
                                                });
                                            }}
                                        >
                                            <Cross2Icon />
                                        </button>
                                    </Text>
                                );
                            })}
                        </div>

                        <button
                            type="submit"
                            className="w-full p-2 mt-5 font-black bg-purple-700 rounded-lg hover:bg-purple-800"
                        >
                            Save
                        </button>
                    </Card>
                </form>
            </div>
        );
    }
}
