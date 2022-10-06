# Contributing

## Git rule

プリリクなしの雑なGithub Flow採用

main ブランチがエラーなしで動く状態保つ

変更加える場合、どちらでも良い
- `[機能の名前]` ブランチ切ってマージするか
- 直接mainにコミット

## TypeScript 型チェック

スクリプト側はbuild実行時にのみタイプチェックするので、エディタの型チェック環境を整えておかないと buildして初めてタイプエラーに気づくことになる。[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)使うのがおすすめ。

詳しくはvite-tsテンプレートの[README.md](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts)

エディタを設定しても予期せぬエラーは発生するので、大きな変更加えた場合はコミット前にbuild走らせておくと安全
