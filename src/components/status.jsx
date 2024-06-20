import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/user.api";
import { useEffect } from "react";

export default function Status() {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["user"],
        queryFn: getUser,
        retry: false,
        refetchOnWindowFocus: false,
    });

    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ["user"] });
            queryClient.setQueryData(["user"], null);
            navigate("/auth/signin");
        },
    });

    useEffect(() => {
        if (isError) {
            // console.log("error in status");
            navigate("/auth/signin");
        }
    }, [isError, isLoading]);

    if (isLoading) {
        // console.log("is loading in status");
        return <p>Loading</p>;
    }

    if (user)
        return (
            <section>
                <div className="flex flex-col gap-3">
                    <p>Id - {user._id}</p>
                    <p>Email - {user.email}</p>
                    <button
                        type="button"
                        className=" bg-slate-600 text-white p-2 rounded-md"
                        onClick={async () => {
                            try {
                                await logoutMutation.mutateAsync();
                            } catch (error) {
                                console.log("couldn't logout");
                                navigate("/auth/signin");
                            }
                        }}
                    >
                        Log out
                    </button>
                </div>
            </section>
        );
}
