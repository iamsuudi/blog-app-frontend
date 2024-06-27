import { AspectRatio, Button, Card, Text } from "@radix-ui/themes";
import {
    ThickArrowUpIcon,
    ChatBubbleIcon,
    Link2Icon,
    BookmarkIcon,
} from "@radix-ui/react-icons";
import BlogDialog from "./blogDialog";

/* eslint react/prop-types: 0 */
export default function Blog({ blog }) {
    return (
        <Card className="flex flex-col w-full gap-2 px-4 pt-6 pb-4 item max-w-80 h-[30rem]">
            <div className="flex justify-end w-full px-5 h-9">
                <BlogDialog blog={blog} />
            </div>

            <Text className="h-40 px-1 mb-auto overflow-hidden text-xl font-black w-72">
                {blog.title}
            </Text>
            <div className="flex gap-3 px-3">
                {blog.tags.map((tag) => {
                    return (
                        <Button
                            key={tag.id}
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
            <Text size={"2"} color="gray" className="px-5 mt-1">
                {new Date(blog.date).toDateString()}
            </Text>

            <AspectRatio ratio={16 / 8}>
                <img
                    src="img.png"
                    alt="A house in a forest"
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
