# スタイルガイド

## Vue Template

- script, template, style の順番

## TypeScript

- ファイル名パスカルケース

## PostCSS

autoprefixerやsort-media-queriesの恩恵を受けるため、PostCSS採用

setting at `postcss.config.js`

### ファイル名

PostCSSだと明示的にわかるように`.pcss`を使う

### モバイルファーストでスタイリングする

基本モバイルファーストでCSS記述する。
プロジェクトの進め方によっては逆でもいいが、プロジェクト内で混在させない。

`custom-media-queries`の機能で、メディアサイズ指定をテンプレート化しており、PCの場合は下記のように書く

```pcss
.pc-object {
  display: none;

  @media (--desktop) {
    display: block;
    /*  */
  }
}

/* 
  設定しているファイル
  ./src/assets/style/preset.pcss 
  */
```

### デザインサイズ適用

レスポンシブサイトの場合カスタム単位を使ってサイズ指定すると楽。

デザイン上の画面幅を `postcss.config.js` で指定、

```js
const MOBILE_DESIGN_WIDTH = 375
const DESKTOP_DESIGN_WIDTH = 1440
```

mpx,dpxという単位を使うことで画面幅に対する相対サイズvwに変換される

```pcss
/* input */
.box {
  /* 横幅画面いっぱいの要素 */
  width: 375mpx;
  @media (--desktop) {
    width: 1440dpx
  }
}

/* output */
.box {
  width: 100vw;
  @media (min-width: 951px) {
    width: 100vw;
  }
}
```

### ネストは使えるが、極力使わない

- ルールの詳細度を単純にして、意図しない上書きを防ぐため
- また、単純にネスト深くなると読みづらくなる
- そもそも scoped 指定なので、ネスト定義する必要がない

```pcss
/* GOOD */
.hoge {
  /*  */
}
.hoge_text {
  /*  */
}

/* BAD */
.hoge {
  .hoge_text {
    /*  */
  }
}
```

- ただし、親のクラスに対する条件をつけたい場合などは使っても良い

```pcss
/* OK */
.hoge {
  .parent-class & {
    /* 
      特定の親クラスの子だった場合のスタイル
      */
  }
}
```

### Class名の連結はしない

```pcss
/* BOOD */
.hoge_yellow {
  /* */
}

/* BAD */
.hoge {
  &_yellow {
    /* 
      HTMLタグに指定してある .hoge_yellow を検索しても、
      直接ジャンプできないので好ましくない 
      */
  }
}
```

### BEM的な装飾クラス

色違いなどの装飾クラスを作る場合は、`--`始まりの装飾クラスを作る

```pcss
/* BOOD */
.hoge {
  &.--blue {
    /* 
      HTMLタグに指定してある hoge --blue を検索してジャンプできる
      */
  }
}

/* OK */
.hoge--blue {
  /* css名が長くなるのであまり使いたくない */
}
```
