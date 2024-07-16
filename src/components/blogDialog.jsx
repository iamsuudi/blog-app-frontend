import {
    ArrowTopRightIcon,
    BookmarkIcon,
    ChatBubbleIcon,
    Link2Icon,
    ThickArrowDownIcon,
    ThickArrowUpIcon,
} from "@radix-ui/react-icons";
import {
    AspectRatio,
    Button,
    Card,
    Dialog,
    Flex,
    Text,
} from "@radix-ui/themes";
import { formatDate } from "../services/formatDate";

/* eslint react/prop-types: 0 */
export default function BlogDialog({ blog }) {
    const { protocol, hostname } = window.location;
    const thumbnailPath = `${protocol}//${hostname}:3001/${blog.thumbnail}`;

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    className="ml-auto font-black rounded-lg hover:cursor-pointer"
                    variant="solid"
                    color="gray"
                    size={"1"}
                    highContrast
                >
                    Read Post <ArrowTopRightIcon color="black" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="relative w-full max-w-screen-sm pt-10">
                <Flex gap="3" mt="4" justify="end" className="">
                    <Dialog.Close>
                        <div className="absolute font-black text-gray-400 rounded-lg right-6 top-6 hover:text-gray-100 hover:cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3.0}
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18 18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </Dialog.Close>
                </Flex>
                <Dialog.Title className="">{blog.description}</Dialog.Title>
                <Dialog.Description
                    size="2"
                    mb="4"
                    className="pl-3 border-l-2 border-yellow-500 rounded-sm"
                >
                    {blog.title}
                </Dialog.Description>

                <Flex direction={"column"} gap={"3"}>
                    <div className="flex gap-3">
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
                    <Text size={"2"} color="gray" className="">
                        {formatDate(blog.date)}
                    </Text>

                    <AspectRatio ratio={16 / 8} className="py-5">
                        <img
                            src={thumbnailPath}
                            alt="A house in a forest"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                                borderRadius: "0.8rem",
                            }}
                        />
                    </AspectRatio>
                </Flex>

                <Card className="flex justify-between w-full rounded-xl backdrop-blur-sm">
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-green-500">
                        <ThickArrowUpIcon className="font-black hover:cursor-pointer" />
                        <span className="hidden md:inline">Upvote</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-red-500">
                        <ThickArrowDownIcon className="font-black hover:cursor-pointer" />
                        <span className="hidden md:inline">Downvote</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-yellow-500">
                        <ChatBubbleIcon className="font-black hover:cursor-pointer" />
                        <span className="hidden md:inline">Comment</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-blue-500">
                        <BookmarkIcon className="font-black hover:cursor-pointer" />
                        <span className="hidden md:inline">Bookmark</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold text-gray-300 hover:text-purple-500">
                        <Link2Icon className="font-black hover:cursor-pointer" />
                        <span className="hidden md:inline">Copy</span>
                    </button>
                </Card>
            </Dialog.Content>
        </Dialog.Root>
    );
}
