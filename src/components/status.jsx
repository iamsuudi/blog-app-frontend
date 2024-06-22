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
        onSettled: (success, error) => {
            queryClient.setQueryData(["user"], null);
            if (success) console.log("logout success ", success);
            if (error) console.log("logout error ", error.message);
        },
    });

    useEffect(() => {
        if (isError) {
            navigate("/auth/signin");
        }
    }, [isLoading]);

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
                        className="p-2 text-white rounded-md bg-slate-600"
                        onClick={async () => {
                            try {
                                await logoutMutation.mutateAsync();
                            } catch (error) {
                                //
                            }
                            navigate("/auth/signin");
                        }}
                    >
                        Log out
                    </button>
                </div>
            </section>
        );
}
