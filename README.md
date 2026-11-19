# UI Expo

ボタンにカーソルを合わせると中身が展開される代表的な5種類のUIパターンを、ビルド不要の **Vanilla HTML / CSS / JavaScript** で実装したインタラクティブUI展示会＆コピー用リポジトリです。

## 収録パターン

| # | UI名 | 英語名 | 主な用途 |
|---|---|---|---|
| 01 | ドロップダウンメニュー | Dropdown Menu | 縦1列のアクション・ナビゲーション一覧 |
| 02 | メガメニュー | Mega Menu | 複数列カテゴリや特集枠を含む大規模ナビ |
| 03 | フライアウトメニュー | Flyout Menu | 横方向へ多階層に展開するサブメニュー |
| 04 | ポップオーバー | Popover | 説明文・価格・ボタンなど自由なカード表示 |
| 05 | スピードダイアル | Speed Dial | 右下FABから複数のクイックアクションを展開 |

## 特徴

- **ビルド不要・依存ゼロ**: そのままブラウザで開くだけ、または GitHub Pages に公開するだけで動作します。
- **コードコピー機能**: 各パターンの HTML / CSS / JS スニペットをその場で切り替えてコピーできます。
- **アクセシビリティ対応**:
  - `aria-haspopup` / `aria-expanded` の自動同期
  - キーボード操作（`↑` `↓` `Home` `End` / サブメニューの `→` `←` / `Escape` で閉じる）
  - ホバーブリッジ + 120ms 遅延クローズによる誤閉鎖防止
  - タッチ端末向けクリックフォールバック
  - `prefers-reduced-motion: reduce` 対応
- **ライト / ダークテーマ切替**: OS設定に追従しつつ手動切替も可能です。

## ファイル構成

```text
ui-expo/
├── index.html           # ショーケース本体（GitHub Pages エントリポイント）
├── styles/
│   ├── base.css         # デザイントークン・レイアウト・コードビューア
│   └── patterns.css     # 5種類のUIパターン用スタイル（再利用可能）
├── scripts/
│   ├── patterns.js      # ホバー・クリック・キーボード制御（再利用可能）
│   └── showcase.js      # テーマ切替・固定表示・コードコピー機能
├── README.md
└── LICENSE
```

## ローカル確認方法

`index.html` をそのままブラウザで開くか、任意の静的サーバーで起動してください。

```bash
python3 -m http.server 8000
```

## GitHub Pages での公開

1. このリポジトリを GitHub にプッシュします。
2. リポジトリの **Settings → Pages** を開きます。
3. **Source** を `Deploy from a branch`、ブランチを `main` / `/ (root)` に設定して保存します。

## License

MIT
