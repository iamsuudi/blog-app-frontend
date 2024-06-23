import { AspectRatio, Button, Card, Text } from "@radix-ui/themes";
import {
    ThickArrowUpIcon,
    ChatBubbleIcon,
    Link2Icon,
    BookmarkIcon,
    ArrowTopRightIcon,
} from "@radix-ui/react-icons";

const blogs = [
    {
        id: 1,
        // title: "CSS Variables (CSS Custom properties) for Beginners",
        title: `Use the ghost variant to display a button without chrome. Ghost buttons behave like text in layout, as they use a negative margin to optically align themselves against their siblings while maintaining the padding in active and hover states.`,
        description: "qwertyuiopiuytrst",
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

function Blog({ blog }) {
    return (
        <Card className="flex flex-col w-full gap-2 px-4 pt-6 pb-4 item max-w-96 h-[35rem]">
            <div className="flex justify-end w-full px-5 h-9">
                <Button
                    className="font-black rounded-lg hover:cursor-pointer"
                    variant="solid"
                    color="gray"
                    highContrast
                >
                    Read Post <ArrowTopRightIcon color="black" />
                </Button>
            </div>

            <Text className="h-40 px-1 mb-auto overflow-hidden text-2xl font-black w-[21rem]">
                {blog.title}
            </Text>
            <div className="flex gap-3 px-3">
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
            <Text size={"2"} color="gray" className="px-5 mt-1">
                {new Date().toDateString()}
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

export default function Blogs() {
    return (
        <div className="flex flex-wrap items-start justify-center w-full gap-10 p-5 md:justify-start">
            {blogs.map((blog) => {
                return <Blog key={blog.id} blog={blog} />;
            })}
        </div>
    );
}
