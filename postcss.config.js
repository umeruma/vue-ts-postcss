const tailwindcss = require('tailwindcss')
const tailwindcssNesting = require('tailwindcss/nesting')

const autoprefixer = require('autoprefixer')
const easyImport = require('postcss-easy-import')
const presetEnv = require('postcss-preset-env')
const relativeUnit = require('postcss-relaxed-unit')
const calc = require('postcss-calc')
const mixins = require('postcss-mixins')
const sortMediaQuery = require('postcss-sort-media-queries')
const atRoot = require('postcss-atroot')

const MOBILE_DESIGN_WIDTH = 375
const DESKTOP_DESIGN_WIDTH = 1440

module.exports = {
  plugins: [
    // LIBRARY
    tailwindcssNesting(),
    tailwindcss(),

    // FUNCTION
    atRoot(),
    mixins(),
    easyImport({
      extensions: ['.css', '.pcss']
    }),
    /**
     * FEATUREリスト
     * https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
     */
    presetEnv({
      // preserve: false,
      /**
       * importFromに関するwarningが出るが、まだ使えるので一旦無視。
       * 将来的にはimport専用のパッケージに分離する？
       * https://github.com/csstools/postcss-plugins/discussions/192
       */
      importFrom: [
        './src/assets/style/preset.pcss'
      ],
      features: {
        // LINK: https://github.com/postcss/postcss-custom-media#readme
        'custom-media-queries': true,
        /**
         * tailwindのnestingとバッティングするので、
         * nesting-rulesを無効にする
         * https://tailwindcss.com/docs/using-with-preprocessors#nesting
         */
        'nesting-rules': false,
        'custom-properties': {
          'disableDeprecationNotice': true
        }
      }
    }),
    /**
     * https://github.com/mistricky/postcss-relaxed-unit#options
     */
    relativeUnit({
      rules: {
        // mobile-px
        mpx: `div(${MOBILE_DESIGN_WIDTH}).mul(100).unit(vw)`,
        // desktop-px
        dpx: `div(${DESKTOP_DESIGN_WIDTH}).mul(100).unit(vw)`,
      }
    }),

    // CLEAN UP
    calc({
      // preserve: false,
    }),

    // SORT
    sortMediaQuery(),
    autoprefixer(),
  ]
}
