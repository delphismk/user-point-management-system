import { useState } from "react";
import { apiClient } from "../api/client";
import type { User } from "../types";

import UserProfileCard from "../components/UserProfileCard";
import ErrorMessage from "../components/ErrorMessage";
import InputForm from "../components/InputForm";
import styles from "./CreateUserPage.module.css"; 

export default function CreateUserPage() {
  const [userName, setUserName] = useState<string>("");
  const [createdUser, setCreatedUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCreate = async () => {
    if (!userName.trim()) {
      setError("ユーザー名を入力してください");
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

  return (
    <div>
      <h2 className={styles.pageTitle}>1. ユーザ登録</h2>

      <InputForm
        value={userName}
        placeholder="ユーザー名を入力"
        buttonText="作成する"
        loadingText="作成中..."
        isLoading={isLoading}
        onChange={setUserName}
        onSubmit={handleCreate}
      />

      <ErrorMessage message={error} />

      <div className={styles.cardWrapper}>
        <UserProfileCard user={createdUser} />
      </div>
    </div>
  );
}