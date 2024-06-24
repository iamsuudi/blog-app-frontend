import {
    ArrowTopRightIcon,
    BookmarkIcon,
    ChatBubbleIcon,
    Cross1Icon,
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
    TextField,
} from "@radix-ui/themes";

/* eslint react/prop-types: 0 */
export default function BlogDialog({ blog }) {
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button
                    className="font-black rounded-lg hover:cursor-pointer"
                    variant="solid"
                    color="gray"
                    highContrast
                >
                    Read Post <ArrowTopRightIcon color="black" />
                </Button>
            </Dialog.Trigger>

            <Dialog.Content className="relative w-full max-w-screen-md py-10">
                <Flex gap="3" mt="4" justify="end" className="">
                    <Dialog.Close>
                        <button className="absolute right-6 top-6">
                            <Cross1Icon color="white" className="font-black" />
                        </button>
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
                        {blog.tags.map((tag, index) => {
                            return (
                                <Button
                                    key={index}
                                    size={"1"}
                                    variant="soft"
                                    color="gray"
                                    className="px-3 rounded-lg w-fit outline outline-1 outline-slate-600"
                                >
                                    # {tag}
                                </Button>
                            );
                        })}
                    </div>
                    <Text size={"2"} color="gray" className="">
                        {new Date().toDateString()}
                    </Text>

                    <AspectRatio ratio={16 / 8} className="py-5">
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
                </Flex>

                <div className="flex justify-between w-full p-2 rounded-xl backdrop-blur-sm bg-black/20">
                    <button className="flex items-center gap-3 text-sm font-bold ">
                        <ThickArrowUpIcon className="font-black hover:text-white hover:cursor-pointer" />
                        <span className="hidden md:inline">Upvote</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold ">
                        <ThickArrowDownIcon className="font-black hover:text-white hover:cursor-pointer" />
                        <span className="hidden md:inline">Downvote</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold ">
                        <ChatBubbleIcon className="font-black hover:text-white hover:cursor-pointer" />
                        <span className="hidden md:inline">Comment</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold ">
                        <BookmarkIcon className="font-black hover:text-white hover:cursor-pointer" />
                        <span className="hidden md:inline">Bookmark</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm font-bold ">
                        <Link2Icon className="font-black hover:text-white hover:cursor-pointer" />
                        <span className="hidden md:inline">Copy</span>
                    </button>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
