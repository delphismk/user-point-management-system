import useCreateUser from "../hooks/useCreateUser";

import UserProfileCard from "../components/UserProfileCard";
import ErrorMessage from "../components/ErrorMessage";
import InputForm from "../components/InputForm";
import styles from "./CreateUserPage.module.css"; 

export default function CreateUserPage() {
    const {
        userName,
        setUserName,
        createdUser,
        error,
        isLoading,
        handleCreate,
    } = useCreateUser();

    return (
        <div>
        <h2 className={styles.pageTitle}>1. ユーザ登録</h2>

        <InputForm
            value={userName}
            placeholder="ユーザー名を入力"
            buttonText="作成する"
            loadingText="作成中..."
            isLoading={isLoading}
            onChange={setUserName} // 文字入力でhooks(setUserName)が走る
            onSubmit={handleCreate} // ボタンが押されたらhooks(handleCreate)が走る
        />

        <ErrorMessage message={error} />

        <div className={styles.cardWrapper}>
            <UserProfileCard user={createdUser} />
        </div>
        </div>
    );
}