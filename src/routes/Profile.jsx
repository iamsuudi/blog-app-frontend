import { Card, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe, updateMe, updateMyAvatar } from "../services/user.api";
import { useEffect, useState } from "react";

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
        mutationFn: async ({ avatar, other }) => {
            console.log({ avatar });
            console.log({ other });
            let updatedUser = await updateMe(other);
            if (avatar) updatedUser = await updateMyAvatar(avatar);
            return updatedUser;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data);
        },
    });

    const [avatarIsChanged, setAvatarIsChanged] = useState(false);
    const [avatar, setAvatar] = useState(null);
    // const [avatarPath, setAvatarPath] = useState(null);

    useEffect(() => {
        if (isError) navigate("/auth/signin");
    }, [isLoading, isError]);

    const updateHandler = async (e) => {
        e.preventDefault();

        const other = Object.fromEntries(new FormData(e.target));
        const form = new FormData();
        form.set("picture", avatar);

        try {
            await updateMutation.mutateAsync({
                other,
                avatar: avatarIsChanged ? form : null,
            });
            navigate("/blogs");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (user)
        return (
            <div className="flex justify-center w-full px-5 py-40">
                <form
                    action=""
                    method="post"
                    onSubmit={updateHandler}
                    className="w-full max-w-screen-sm "
                >
                    <Card className="flex flex-col items-center w-full gap-5 px-5 py-10">
                        <h1 className="mb-10 text-5xl font-bold">Profile</h1>
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">
                                First Name
                            </Text>
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
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">Last Name</Text>
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
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">Email</Text>
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
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">
                                Github URL
                            </Text>
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
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">About</Text>
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
                        <label className="flex flex-col items-center w-full max-w-lg gap-3">
                            <Text className="w-full font-black">Avatar</Text>
                            <input
                                // required
                                type="file"
                                name="avatar"
                                accept="image/,.png"
                                className="w-full text-sm"
                                onChange={({ target }) => {
                                    const img = target.files[0];
                                    const imgUrl = URL.createObjectURL(img);
                                    setAvatar(img);
                                    setAvatarIsChanged(true);
                                }}
                            />
                        </label>

                        {/* <AspectRatio ratio={16 / 8} className="max-w-lg border">
                            <img
                                src={avatarPath}
                                alt="Thumbnail"
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "0.8rem",
                                }}
                            />
                        </AspectRatio> */}

                        <button
                            type="submit"
                            className="w-full max-w-lg p-2 mt-5 font-black bg-gray-600 rounded-lg hover:bg-gray-700"
                        >
                            Save
                        </button>
                    </Card>
                </form>
            </div>
        );
}
