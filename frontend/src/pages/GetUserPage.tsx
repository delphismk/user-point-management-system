import ErrorMessage from "../components/ErrorMessage";
import LabeledInput from "../components/LabeledInput";
import UserProfileCard from "../components/UserProfileCard";

import { useGetUser } from "../hooks/useGetUser";

import styles from "./GetUserPage.module.css"

export default function GetUserPage() {
    // hooks利用
    const { 
        userId, setUserId,
        fetchedUser, error, isLoading, handleGetUser
    } = useGetUser();

    // UI構築(component)
    return (
        <div>
            <h2 className={styles.pageTitle}> ユーザ情報確認 </h2>
            
            {/* ユーザID入力 */}
            <LabeledInput
                label="検索したいユーザID"
                placeholder="例: abc-123"
                value={userId}
                onChange={setUserId}
                disabled={isLoading}
            />

            {/* 確認ボタン */}
            <button
                className={styles.submitButton}
                onClick={handleGetUser}
                disabled={isLoading}
            >
                {isLoading ? "処理中..." : "ユーザを検索する"}
            </button>

            {/* エラー部品 */}
            <ErrorMessage message={error}/>

            {/* 検索したユーザ情報の表示 */}
            <div className={styles.cardWrapper}>
                <UserProfileCard user={fetchedUser}/>
            </div>
        </div>

    )

}