import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getMe, login } from "../services/user.api";
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

export default function Signin() {
    const navigate = useNavigate();

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (success) => {
            console.log("login success ", success);
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    useEffect(() => {
        if (user) {
            // console.log("from signin");
            // console.log({ user });

            navigate("/blogs");
            // console.log("not redirecting");
            // return null;
        }
    }, [isLoading, isError]);

    if (isLoading) {
        // console.log("loading");
        return <p>loading...</p>;
    }

    const signinHandler = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            await loginMutation.mutateAsync(form);
            navigate("/blogs");
        } catch (error) {
            console.log(error.message);
        }
    };

    const signWithGoogle = () => {
        window.open("http://localhost:3001/api/auth/signin/google", "_self");
    };

    const signWithGithub = () => {
        window.open("http://localhost:3001/api/auth/signin/github", "_self");
    };

    if (!user)
        return (
            <Section className="px-5 py-40">
                <Card className="flex flex-col gap-10 p-10">
                    <h2 className="text-4xl font-bold text-center">Sign In</h2>

                    <form
                        action=""
                        method="post"
                        className="flex flex-col gap-3 "
                        onSubmit={signinHandler}
                    >
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Email</Text>
                            <TextField.Root
                                placeholder="Email"
                                required
                                type="email"
                                name="email"
                                variant="soft"
                                color="gray"
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Password</Text>
                            <TextField.Root
                                placeholder="Password"
                                required
                                type="password"
                                name="password"
                                variant="soft"
                                className="w-full"
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
                            <EnvelopeClosedIcon /> Signin with Google
                        </Button>
                        <Button
                            highContrast
                            color="gray"
                            variant="solid"
                            type="button"
                            onClick={signWithGithub}
                            className="hover:cursor-pointer"
                        >
                            <GitHubLogoIcon color="black" /> Signin with Github
                        </Button>
                    </Flex>

                    <NavLink
                        to={"/auth/signup"}
                        className={
                            "underline underline-offset-4 text-sm font-bold"
                        }
                    >
                        Signup
                    </NavLink>
                </Card>
            </Section>
        );
}
