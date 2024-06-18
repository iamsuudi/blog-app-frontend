// import

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/user.api";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/user/userSlice";
// Configure Axios to send cookies with requests
axios.defaults.withCredentials = true;

export default function Status() {
    const navigate = useNavigate();

    const user = useSelector(({ user }) => user);
    const dispatch = useDispatch();

    const queryClient = useQueryClient();
    const logoutMutation = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    });

    return (
        <section>
            <div className="flex flex-col gap-3">
                <p>Id - {user._id}</p>
                <p>Email - {user.email}</p>
                <button
                    type="button"
                    className=" bg-slate-600 text-white p-2 rounded-md"
                    onClick={async () => {
                        logoutMutation.mutate();
                        dispatch(removeUser());
                        navigate("/auth/signin");
                    }}
                >
                    Log out
                </button>
            </div>
        </section>
    );
}
