import { Box, Button, Card, Flex, Text } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

export default function Hero() {
    return (
        <Box className="flex flex-wrap items-center justify-center w-full max-w-screen-lg gap-10 px-5">
            <Card className="flex flex-col items-center gap-10 p-5 backdrop-blur-md">
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
                        className="px-10 py-6 font-black hover:cursor-pointer"
                    >
                        Join Our Community
                    </Button>
                </NavLink>
            </Card>
        </Box>
    );
}
