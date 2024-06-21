import { NavLink, useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Flex,
    Section,
    Separator,
    Text,
    TextField,
} from "@radix-ui/themes";
import { GitHubLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import { signup } from "../services/user.api";

export default function Signup() {
    const navigate = useNavigate();

    const signupHandler = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            await signup(form);
            navigate("/auth/status");
        } catch (error) {
            console.log(error.message);
            navigate("");
        }
    };

    const signWithGoogle = () => {
        window.open("http://localhost:3001/api/auth/signin/google", "_self");
    };

    const signWithGithub = () => {
        window.open("http://localhost:3001/api/auth/signin/google", "_self");
    };

    return (
        <Section className="py-40 px-5">
            <Card className="p-10 flex flex-col gap-10">
                <h2 className="text-4xl text-center font-bold">Sign Up</h2>

                <form
                    action=""
                    method="post"
                    className=" flex flex-col gap-3"
                    onSubmit={signupHandler}
                >
                    <label className="flex items-center gap-3">
                        <Text className="w-20 font-black">Email</Text>
                        <TextField.Root
                            placeholder="Email"
                            required
                            type="email"
                            name="email"
                            variant="soft"
                            color="gray"
                        />
                    </label>
                    <label className="flex items-center gap-3">
                        <Text className="w-20 font-black">Password</Text>
                        <TextField.Root
                            placeholder="Password"
                            required
                            type="password"
                            name="password"
                            variant="soft"
                            className=""
                            color="gray"
                        />
                    </label>
                    <Button
                        variant="solid"
                        radius="large"
                        type="submit"
                        className="mt-5 hover:cursor-pointer"
                    >
                        SignIn
                    </Button>
                </form>

                <Separator size="4" />

                <Flex direction={"column"} gap={"3"}>
                    <Button
                        color="yellow"
                        variant="solid"
                        type="button"
                        onClick={signWithGoogle}
                        className="hover:cursor-pointer"
                    >
                        <EnvelopeClosedIcon /> Signup with Google
                    </Button>
                    <Button
                        highContrast
                        color="gray"
                        variant="solid"
                        type="button"
                        onClick={signWithGithub}
                        className="hover:cursor-pointer"
                    >
                        <GitHubLogoIcon color="black" /> Signup with Github
                    </Button>
                </Flex>

                <NavLink
                    to={"/auth/signin"}
                    className={"underline underline-offset-4 text-sm font-bold"}
                >
                    Signin
                </NavLink>
            </Card>
        </Section>
    );
}
