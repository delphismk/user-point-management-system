import type { User } from "../types";

// 共通のerrhandle関数
async function handleResponse(res: Response) {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} ${text}`);
    }
    return res.json();
}

// アプリ全体で使うAPI Client
export const apiClient = {
    // 1. ユーザ作成 (POST /v1/users)
    createUser: async (userName: string): Promise<User> => {
        const res = await fetch("/v1/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {userName} )

        });
        return handleResponse(res)
    },

    // ② ユーザー取得 (GET /v1/users/{user_id})
    getUser: async (userId: string): Promise<User> => {
        const res = await fetch(`/v1/users/${encodeURIComponent(userId)}`);
        return handleResponse(res);
    },

    // ③ ポイント加算 (POST /v1/users/{user_id}/points:add)
    addPoints: async (userId: string, points: number): Promise<User> => {
        const res = await fetch(`/v1/users/${encodeURIComponent(userId)}/points:add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Protoの `AddPointsRequest` に合わせて、キー名を `addPoints` にする
        body: JSON.stringify({ addPoints: points }), 
        });
        return handleResponse(res);
    },
};

