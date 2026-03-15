import { useState } from "react";
import { apiClient } from "../api/client";
import type {User} from "../types";

export const useGetUser = () => {
    const [userId, setUserId] = useState<string>("");
    const [fetchedUser, setFetchedUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleGetUser = async () => {
        if (!userId.trim()) {
            setError("ユーザIDを入力してください");
            return;
        }

        setError("");
        setIsLoading(true);
        
        try {
            const user = await apiClient.getUser(userId);
            setFetchedUser(user);
        } catch (err: any) {
            setError(err.message)
            setFetchedUser(null)
        } finally {
            setIsLoading(false)
        }
    };

    return {
        userId,
        setUserId,
        fetchedUser,
        error,
        isLoading,
        handleGetUser
    }



}
