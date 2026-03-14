- App
    - app.tsx
        - routing
    - components
        - props受け取り+表示の関数(tsx)
        - アニメーション(css)
    - Pages
        - State(useState)
        - hooks(useEffect等)
        - api
        - component組立
    - styles
        - 各componentsに対応するアニメーションcss


src/
├── api/
│   └── client.ts                  // API通信処理（Protoベース）
├── components/
│   ├── Layout.tsx                 // 左サイドバーと右メインコンテンツの大枠
│   ├── Layout.module.css          // Layout用のスタイル
│   ├── UserProfileCard.tsx        // ユーザ情報表示UI
│   └── UserProfileCard.module.css // Card用のスタイル
├── pages/
│   ├── CreateUserPage.tsx         // 1. ユーザ登録画面
│   ├── AddPointsPage.tsx          // 2. ポイント加算画面
│   └── GetUserPage.tsx            // 3. ユーザ情報確認画面
├── types/
│   └── index.ts                   // Protoベースの型定義（完了✨）
├── App.tsx                        // ルーター設定
└── main.tsx