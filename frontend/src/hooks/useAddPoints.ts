import { useState } from "react";
import { apiClient } from "../api/client";
import type {User} from "../types";

export const useAddPoints = () => {
    const [userId, setUserId] = useState<string>("");
    const [points, setPoints] = useState<number | "">("");
    const [addedUser, setAddedUser] = useState<User | null>(null);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleAddPoints = async () => {
        if (!userId.trim()) {
            setError("ユーザIdを入力してください")
            return;
        }
        const numPoints = Number(points)
        if (!numPoints || numPoints < 0) {
            setError("加算するポイントは1以上を指定してください");
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            const user = await apiClient.addPoints(userId, numPoints);
            setAddedUser(user);
            setPoints("");
        } catch (err: any) {
            setError(err.message);
            setAddedUser(null)
        } finally{
            setIsLoading(false);
        }
    };

    return {
        userId,
        setUserId,
        points,
        setPoints,
        addedUser,
        error,
        isLoading,
        handleAddPoints,
    };
};
