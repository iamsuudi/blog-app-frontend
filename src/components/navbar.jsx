import { Flex, Heading, Section } from "@radix-ui/themes";
import { NavLink } from "react-router-dom";

export default function Nav() {
    return (
        <Flex
            width={"100%"}
            justify={"center"}
            className="fixed z-10 backdrop-blur-sm bg-black/50 shadow-lg"
        >
            <Section size={"1"} py={"5"} className="w-full max-w-screen-2xl px-5">
                <NavLink to={"/"}>
                    <Heading
                        size="6"
                        className="text-2xl font-black text-gray-300"
                    >
                        Members Only
                    </Heading>
                </NavLink>
            </Section>
        </Flex>
    );
}
