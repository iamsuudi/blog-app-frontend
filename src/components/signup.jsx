import { NavLink } from "react-router-dom";

export default function Signup() {
    return (
        <section>
            <h2 className="text-4xl text-center py-5 font-bold">Signup</h2>
            <form action="" method="post" className=" flex flex-col gap-3">
                <label htmlFor="">
                    email{" "}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className=" p-2 border-2"
                    />
                </label>
                <label htmlFor="">
                    password{" "}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className=" p-2 border-2"
                    />
                </label>
                <button type="button" className=" bg-slate-600 text-white p-2 rounded-md">
                    Sign Up
                </button>
                <NavLink
                    to={"/auth/signin"}
                    className={"underline"}
                >
                    Signin
                </NavLink>
            </form>
        </section>
    );
}
