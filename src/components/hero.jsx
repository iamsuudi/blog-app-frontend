import { AspectRatio, Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

export default function Hero() {
    return (
        <Box className="w-full max-w-screen-lg py-40 px-5 flex flex-wrap items-center justify-center gap-10">
            <AspectRatio ratio={16 / 8}>
                <img
                    src="chat.png"
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                        borderRadius: "var(--radius-2)",
                    }}
                />
            </AspectRatio>

            <Card className="p-5 flex flex-col items-center gap-10 backdrop-blur-md">
                <Flex direction="column" gap="2" className="max-w-96">
                    <Text className="text-4xl text-center">Welcome</Text>
                    <Text className="text-center">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the industry
                        standard
                    </Text>
                </Flex>
                <NavLink to={"/auth/signin"}>
                    <Button
                        color="gray"
                        variant="soft"
                        radius="full"
                        className="py-6 px-10 font-black"
                    >
                        Join Our Community
                    </Button>
                </NavLink>
            </Card>
        </Box>
    );
}
