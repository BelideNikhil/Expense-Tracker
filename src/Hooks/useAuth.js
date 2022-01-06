import { Context } from "../Context/AuthProvider";
import { useContext } from "react";

export function useAuth() {
    return useContext(Context)
}
