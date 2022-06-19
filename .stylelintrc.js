module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss', 'stylelint-config-prettier'],
  rules: {
    'color-no-invalid-hex': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['after-single-line-comment', 'first-nested'],
      },
    ],
    'no-duplicate-selectors': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
}
