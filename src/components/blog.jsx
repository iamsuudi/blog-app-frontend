import {
    AspectRatio,
    Button,
    Card,
    IconButton,
    Text,
    Tooltip,
} from "@radix-ui/themes";
import {
    ThickArrowUpIcon,
    ChatBubbleIcon,
    Link2Icon,
    BookmarkIcon,
    Pencil2Icon,
} from "@radix-ui/react-icons";
import BlogDialog from "./blogDialog";
import { formatDate } from "../services/formatDate";
import { Link } from "react-router-dom";

/* eslint react/prop-types: 0 */
export default function Blog({ blog }) {
    const { protocol, hostname } = window.location;
    const thumbnailPath = `${protocol}//${hostname}:3001/${blog.thumbnail}`;

    if (blog)
        return (
            <Card className="flex flex-col w-full gap-2 px-4 pt-6 pb-4 item max-w-80 h-[30rem]">
                <div className="flex justify-between w-full px-0 h-9">
                    <Link
                        to={`/blogs/${blog.id}/edit`}
                        className="hover:cursor-pointer"
                    >
                        <Tooltip content="Edit Blog">
                            <IconButton
                                radius="full"
                                color="gold"
                                variant="solid"
                                size={"1"}
                                className="hover:cursor-pointer"
                            >
                                <Pencil2Icon />
                            </IconButton>
                        </Tooltip>
                    </Link>
                    <BlogDialog blog={blog} />
                </div>

                <Text className="h-40 px-1 mb-auto overflow-hidden text-xl font-black w-72">
                    {blog.title}
                </Text>

                <div className="flex gap-3 px-3">
                    {blog.tags.map((tag) => {
                        return (
                            <Button
                                key={tag._id}
                                size={"1"}
                                variant="soft"
                                color="gray"
                                className="px-3 rounded-lg w-fit outline outline-1 outline-slate-600"
                            >
                                # {tag.content}
                            </Button>
                        );
                    })}
                </div>

                <Text size={"1"} color="gray" className="px-5 my-1">
                    {formatDate(blog.date)}
                </Text>

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

                <div className="flex justify-between w-4/5 mx-auto mt-2">
                    <Button variant="soft" color="green" radius="large">
                        <ThickArrowUpIcon className="w-4 h-4 font-black hover:text-white hover:cursor-pointer" />
                    </Button>
                    <Button variant="soft" color="yellow" radius="large">
                        <ChatBubbleIcon className="w-4 h-4 font-black hover:text-white hover:cursor-pointer" />
                    </Button>
                    <Button variant="soft" color="red" radius="large">
                        <BookmarkIcon className="w-4 h-4 font-black hover:text-white hover:cursor-pointer" />
                    </Button>
                    <Button variant="soft" color="blue" radius="large">
                        <Link2Icon className="w-4 h-4 font-black hover:text-white hover:cursor-pointer" />
                    </Button>
                </div>
            </Card>
        );
}
