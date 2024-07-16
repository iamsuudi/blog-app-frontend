import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getMe, logout } from "../services/user.api";
import { useEffect } from "react";
import { Avatar, DropdownMenu, Spinner } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes/dist/esm/components/callout.js";

export default function Status() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

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

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSettled: (success, error) => {
            queryClient.setQueryData(["user"], null);
            // if (success) console.log("logout success ", success);
            if (error) console.log("logout error ", error.message);
        },
    });

    useEffect(() => {}, [isLoading, isError]);

    const logoutHandler = async () => {
        try {
            await logoutMutation.mutateAsync();
        } catch (error) {
            //
        }
        navigate("/auth/signin");
    };

    if (isLoading) {
        // console.log("is loading in status");
        return <Spinner size={"3"} />;
    }

    if (user) {
        const { protocol, hostname } = window.location;
        const avatarPath = `${protocol}//${hostname}:3001/${user.picture}`;

        return (
            <div className="flex items-center gap-5 p-3 font-bold rounded-full w-fit">
                <Text className="hidden sm:inline">{user.givenName}</Text>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <button className="rounded-full w-fit">
                            <Avatar
                                size="3"
                                src={avatarPath}
                                fallback={`${user.givenName[0] ?? ""}${user.familyName[0] ?? ""}`}
                                radius="full"
                            />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content
                        color="gray"
                        variant="soft"
                        className="p-1 text-sm bg-black/70 rounded-2xl text-slate-300 backdrop-blur-md"
                    >
                        <div className="flex flex-col items-stretch gap-2 w-36">
                            <button className="py-2 pl-10 rounded-md hover:bg-white/10 hover:text-white text-start">
                                <Link to={"/profile"}>Profile</Link>
                            </button>
                            <button className="py-2 pl-10 rounded-md hover:bg-white/10 hover:text-white text-start">
                                Favorite
                            </button>
                            <LogoutBtn logoutHandler={logoutHandler} />
                        </div>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        );
    }
}

/* eslint react/prop-types: 0 */
function LogoutBtn({ logoutHandler }) {
    return (
        <button
            className="py-2 pl-10 rounded-md hover:bg-white/10 hover:text-white text-start"
            onClick={logoutHandler}
        >
            Log out
        </button>
    );
}
