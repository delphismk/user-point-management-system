- App
    - main.tsx
        - エントリーポイント
    - app.tsx：ルーティングの担当
        - routing
    - types
        - データの型定義
    - components：1つの画面要素を作る
        - props受け取り+表示の関数(tsx)
        - アニメーション(css)
    - api: bkとの通信、道具の受け取り
        - 通信処理とそのハンドリング等
    - hooks：画面のロジック(遷移・効果)の切り出し
        - API呼び出しや状態管理ロジック担当(useState, useEffect等)
    - Pages：1画面を作る
        - hooks呼び出し
        - component組立

src/
├── api/
│   ├── client.ts
│   └── question.txt
├── App.tsx
├── components/
│   ├── ErrorMessage.tsx
│   ├── ErrorMessage.module.css
│   ├── InputForm.tsx
│   ├── InputForm.module.css
│   ├── LabeledInput.tsx
│   ├── LabeledInput.module.css
│   ├── Layout.tsx
│   ├── Layout.module.css
│   ├── UserProfileCard.tsx
│   └── UserProfileCard.module.css
├── hooks/
│   ├── useAddPoints.ts
│   ├── useCreateUser.ts
│   └── useGetUser.ts
├── main.tsx
├── pages/
│   ├── AddPointsPage.tsx
│   ├── AddPointsPage.module.css
│   ├── CreateUserPage.tsx
│   ├── CreateUserPage.module.css
│   ├── GetUserPage.tsx
│   └── GetUserPage.module.css
└── types/
    └── index.ts