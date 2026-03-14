import { Link, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.container}>
      {/* 左側のサイドバー */}
      <nav className={styles.sidebar}>
        <h2 className={styles.title}>ポイント管理システム</h2>
        <ul className={styles.menuList}>
          <li><Link to="/" className={styles.link}>ユーザ登録</Link></li>
          <li><Link to="/add-points" className={styles.link}>ポイント加算</Link></li>
          <li><Link to="/get-user" className={styles.link}>ユーザ情報確認</Link></li>
        </ul>
      </nav>

      {/* 右側のメインコンテンツ */}
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}