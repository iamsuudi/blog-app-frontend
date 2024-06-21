import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../services/user.api";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/user.api";
import { useEffect } from "react";

export default function Signin() {
    const navigate = useNavigate();

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
            console.log("from signin");
            console.log({ user });

            navigate("/auth/status");
            console.log("not redirecting");
            // return null;
        }
    }, [isError, isLoading]);

    if (isLoading) {
        // console.log("loading");
        return <p>loading...</p>;
    }

    const signinHandler = async (e) => {
        e.preventDefault();

        const form = Object.fromEntries(new FormData(e.target));

        try {
            await loginMutation.mutateAsync(form);
            // navigate("/auth/status");
        } catch (error) {
            console.log(error.message);
        }
    };

    if (!user)
        return (
            <section>
                <h2 className="text-4xl text-center py-5 font-bold">Signin</h2>
                <form
                    action=""
                    method="post"
                    className=" flex flex-col gap-3"
                    onSubmit={signinHandler}
                >
                    <label htmlFor="">
                        email{" "}
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="Email"
                            className=" p-2 border-2"
                        />
                    </label>
                    <label htmlFor="">
                        password{" "}
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            placeholder="Password"
                            className=" p-2 border-2"
                        />
                    </label>
                    <button
                        type="submit"
                        className=" bg-slate-600 text-white p-2 rounded-md"
                    >
                        Sign in
                    </button>
                    <NavLink to={"/auth/signup"} className={"underline"}>
                        Signup
                    </NavLink>
                </form>
                <button
                    type="button"
                    onClick={() => {
                        window.open(
                            "http://localhost:3001/api/auth/signin/google",
                            "_self",
                        );
                    }}
                    className=" bg-green-600 text-white p-2 rounded-md"
                >
                    Google
                </button>
                <button
                    type="button"
                    onClick={() => {
                        window.open(
                            "http://localhost:3001/api/auth/signin/github",
                            "_self",
                        );
                    }}
                    className=" bg-blue-600 text-white p-2 rounded-md"
                >
                    Github
                </button>
            </section>
        );
}
