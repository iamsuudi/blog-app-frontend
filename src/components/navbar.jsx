import { Flex, Heading, Section } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";
import Status from "./status";

export default function Nav() {
    return (
        <Flex
            width={"100%"}
            justify={"center"}
            className="fixed z-10 shadow-lg backdrop-blur-md "
        >
            <Section
                size={"1"}
                py={"5"}
                className="flex items-center justify-between w-full px-5 max-w-screen-2xl"
            >
                <NavLink to={"/"}>
                    <Heading
                        size="6"
                        className="py-1 text-2xl font-black text-transparent sm:text-4xl w-fit bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-yellow-500"
                    >
                        Members Only
                    </Heading>
                </NavLink>
                <Status />
            </Section>
        </Flex>
    );
}
