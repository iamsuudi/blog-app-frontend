import { Card, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe } from "../services/user.api";
import { useEffect } from "react";

export default function Profile() {
    const navigate = useNavigate();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getMe,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateMe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    useEffect(() => {
        if (isError) navigate("/auth/signin");
    }, [isLoading, isError]);

    const updateHandler = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            await updateMutation.mutateAsync(form);
            navigate("/blogs");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (user)
        return (
            <div className="flex justify-center w-full px-5 py-40">
                <form action="" method="post" onSubmit={updateHandler} className="w-full max-w-screen-sm ">
                    <Card className="flex flex-col items-center w-full gap-5 px-5 py-10">
                        <h1 className="mb-10 text-5xl font-bold">Profile</h1>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">First Name</Text>
                            <TextField.Root
                                placeholder="First Name"
                                required
                                type="text"
                                name="givenName"
                                variant="soft"
                                color="gray"
                                defaultValue={user.givenName}
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Last Name</Text>
                            <TextField.Root
                                placeholder="Last Name"
                                // required
                                type="text"
                                name="familyName"
                                variant="soft"
                                color="gray"
                                defaultValue={user.familyName}
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Email</Text>
                            <TextField.Root
                                placeholder="Email"
                                // required
                                type="email"
                                name="email"
                                variant="soft"
                                color="gray"
                                defaultValue={user.email}
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Github URL</Text>
                            <TextField.Root
                                placeholder="https://github.com/username"
                                // required
                                type="text"
                                name="github"
                                variant="soft"
                                color="gray"
                                defaultValue={user.github}
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">About</Text>
                            <TextField.Root
                                placeholder="E.g - BSc in Computer Science"
                                // required
                                type="text"
                                name="title"
                                variant="soft"
                                color="gray"
                                defaultValue={user.title}
                                className="w-full"
                            />
                        </label>
                        <label className="flex flex-col items-center gap-3">
                            <Text className="font-black w-72">Avatar</Text>
                            <input
                                // required
                                type="file"
                                name="avatar"
                                accept="image/,.png"
                                className="w-full text-sm"
                            />
                        </label>

                        <button
                            type="submit"
                            className="w-full p-2 mt-5 font-black bg-gray-600 rounded-lg max-w-72 hover:bg-gray-700"
                        >
                            Save
                        </button>
                    </Card>
                </form>
            </div>
        );
}
