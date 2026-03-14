import type { User } from "../types";
import styles from "./UserProfileCard.module.css"; // CSSモジュールをインポート

// 親から受け取るpropsの定義（Union）
type Props = {
    user: User | null;
};

export default function UserProfileCard({ user }: Props) {
    if (!user) return null;

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>ユーザ情報</h3>
            <p className={styles.row}><strong>ID:</strong> {user.userId}</p>
            <p className={styles.row}><strong>名前:</strong> {user.userName}</p>
            <p className={styles.row}><strong>ポイント:</strong> {user.userPoints}</p>
        </div>
        

    )


}
