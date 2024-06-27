import {
    Button,
    Card,
    Spinner,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { createBlog, uploadThumbnail } from "../services/blog.api";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/user.api";
import { useEffect, useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

export default function BlogForm() {
    const navigate = useNavigate();

    const user = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");

    useEffect(() => {
        if (user.isError) navigate("/auth/signin");
    }, [user.isLoading, user.isError]);

    if (user.isLoading) return <Spinner size={"3"} />;

    const createPostHandler = async (e) => {
        e.preventDefault();

        const formObject = Object.fromEntries(new FormData(e.target));
        const formThumbnail = new FormData(e.target);
        formObject.tags = tags;
        formObject.thumbnail = "";

        try {
            const createdBlog = await createBlog(formObject);
            await uploadThumbnail(createdBlog.id, formThumbnail);
            navigate("/blogs");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="flex justify-center w-full px-5 py-40">
            <form
                action=""
                method="post"
                onSubmit={createPostHandler}
                className="w-full max-w-screen-sm "
                encType="multipart/form-data"
            >
                <Card className="flex flex-col items-center w-full gap-5 px-5 py-10">
                    <h1 className="mb-10 text-5xl font-bold">Profile</h1>

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
                        />
                    </label>

                    <label className="flex flex-col items-center w-full gap-3">
                        <Text className="w-full font-black min-w-72">URL</Text>
                        <TextField.Root
                            placeholder="URL"
                            // required
                            type="text"
                            name="url"
                            variant="soft"
                            color="gray"
                            className="w-full"
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
                        />
                    </label>

                    <label className="flex flex-col items-center w-full gap-3">
                        <Text className="w-full font-black min-w-72">Tags</Text>
                        <div className="flex items-center w-full gap-0 min-w-72">
                            <TextField.Root
                                placeholder="Type tag here"
                                // required
                                type="text"
                                name="tags"
                                value={tag}
                                onChange={({ target }) => setTag(target.value)}
                                variant="soft"
                                color="gray"
                                className="w-full rounded-r-none max-w-60"
                            />
                            <Button
                                color="gray"
                                disabled={tag.length < 3}
                                onClick={() => {
                                    setTags(
                                        tags.concat({
                                            content: tag,
                                            id: Date.now(),
                                        }),
                                    );
                                    setTag("");
                                }}
                                className="rounded-l-none hover:cursor-pointer"
                            >
                                <PlusIcon />
                            </Button>
                        </div>
                    </label>

                    <div className="flex w-full gap-3">
                        {tags.map((tag) => {
                            return (
                                <Text
                                    color="gray"
                                    variant="soft"
                                    size={"2"}
                                    key={tag.id}
                                    className="flex items-center gap-2 px-2 py-1 bg-gray-700 rounded-lg"
                                >
                                    <Text># {tag.content}</Text>
                                    <button
                                        className="text-red-500 scale-90 hover:scale-75"
                                        onClick={() => {
                                            setTags(
                                                tags.filter(
                                                    (t) => t.id !== tag.id,
                                                ),
                                            );
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
                        className="w-full p-2 mt-5 font-black bg-green-600 rounded-lg max-w-72 hover:bg-green-700"
                    >
                        Create
                    </button>
                </Card>
            </form>
        </div>
    );
}
