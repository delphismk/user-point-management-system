import { useState } from "react";
import { apiClient } from "../api/client";
import type { User } from "../types";

export default function useCreateUser() {
    const [userName, setUserName] = useState<string>("");
    const [createdUser, setCreatedUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCreate = async () => {
        if (!userName.trim()){
            setError("ユーザ名を入力してください");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const user = await apiClient.createUser(userName);
            setCreatedUser(user);
            setUserName("");
        } catch (err: any) {
            setError(err.message);
            setCreatedUser(null);
        } finally {
            setIsLoading(false);
        }

    };

    return {
        userName,
        setUserName,
        createdUser,
        error,
        isLoading,
        handleCreate,
    };
};