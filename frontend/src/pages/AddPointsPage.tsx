import { useAddPoints } from "../hooks/useAddPoints";

import ErrorMessage from "../components/ErrorMessage";
import LabeledInput from "../components/LabeledInput";
import UserProfileCard from "../components/UserProfileCard";

import styles from "./AddPointsPage.module.css"

export default function AddPointsPage() {
    // hooksから道具受け取り
    const {
        userId, setUserId,
        points, setPoints,
        addedUser, error, isLoading, handleAddPoints
    } = useAddPoints();

    // UI構築
    return (
        <div>
            <h2 className={styles.pageTitle}> ポイント加算 </h2>
            
            {/* ユーザID入力 */}
            <LabeledInput
                label="ユーザID"
                placeholder="例: abc-123"
                value={userId}
                onChange={setUserId}
                disabled={isLoading}
            />

            {/* ポイント入力 */}
            <LabeledInput
                label="加算ポイント"
                placeholder="例: 100"
                value={points}
                onChange={(val) => setPoints(val == "" ? "" : Number(val))}
                disabled={isLoading}
            />

            {/* 加算ボタン */}
            <button
                className={styles.submitButton}
                onClick={handleAddPoints}
                disabled={isLoading}
            >
                {isLoading ? "処理中..." : "ポイントを加算する"}
            </button>

            {/* エラー部品 */}
            <ErrorMessage message={error}/>

            {/* 変更したユーザ情報の表示 */}
            <div className={styles.cardWrapper}>
                <UserProfileCard user={addedUser}/>
            </div>
        </div>

    )


}
