module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
  
    // View link below for commitlint documentation
    // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#available-rules
    rules: {
      // body is in case value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-case
      'body-case': [2, 'always', 'sentence-case'],
  
      // body is empty
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-empty
      'body-empty': [0, 'always'],
  
      // body ends with value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-full-stop
      'body-full-stop': [1, 'always', '.'],
  
      // body begins with blank line
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-leading-blank
      'body-leading-blank': [1, 'always'],
  
      // body has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-max-length
      'body-max-length': [2, 'always', Infinity],
  
      // body lines has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-max-line-length
      'body-max-line-length': [2, 'always', 100],
  
      // body has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#body-min-length
      'body-min-length': [1, 'always', 10],
  
      // footer begins with blank line
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#footer-leading-blank
      'footer-leading-blank': [1, 'always'],
  
      // footer is empty
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#footer-empty
      'footer-empty': [0, 'always'],
  
      // footer has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#footer-max-length
      'footer-max-length': [2, 'always', Infinity],
  
      // footer lines has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#footer-max-line-length
      'footer-max-line-length': [2, 'always', 100],
  
      // footer has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#footer-min-length
      'footer-min-length': [2, 'always', 0],
  
      // header is in case value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#header-case
      'header-case': [0, 'never'],
  
      // header ends with value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#header-full-stop
      'header-full-stop': [0, 'always'],
  
      // header has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#header-max-length
      'header-max-length': [2, 'always', 100],
  
      // header has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#header-max-length
      'header-min-length': [2, 'always', 0],
  
      // references has at least one entry
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#references-empty
      'references-empty': [0, 'never'],
  
      // scope is found in value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#scope-enum
      'scope-enum': [0, 'always'],
  
      // scope is in case value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#scope-case
      'scope-case': [2, 'always', ['lower-case', 'pascal-case', 'camel-case']],
  
      // scope is empty
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#scope-empty
      'scope-empty': [0, 'always'],
  
      // scope has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#scope-max-length
      'scope-max-length': [2, 'always', Infinity],
  
      // scope has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#scope-min-length
      'scope-min-length': [2, 'always', 0],
  
      // subject is in case value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-case
      'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
  
      // subject is empty
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-empty
      'subject-empty': [2, 'never'],
  
      // subject ends with value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-full-stop
      'subject-full-stop': [2, 'never', '.'],
  
      // subject has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-max-length
      'subject-max-length': [2, 'always', Infinity],
  
      // subject has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-min-length
      'subject-min-length': [2, 'always', 0],
  
      // subject has exclamation before the : marker
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#subject-exclamation-mark
      'subject-exclamation-mark': [0, 'always'],
  
      // type is in case value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#type-case
      'type-case': [2, 'always', 'lower-case'],
  
      // type is empty
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#type-empty
      'type-empty': [2, 'never'],
  
      // type is found in value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#type-enum
      'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'refactor', 'revert', 'docs', 'test']],
  
      // type has value or less characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#type-max-length
      'type-max-length': [2, 'always', Infinity],
  
      // type has value or more characters
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#type-min-length
      'type-min-length': [2, 'always', 0],
  
      // message has value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#signed-off-by
      'signed-off-by': [0, 'never'],
  
      // message has trailer value
      // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md#trailer-exists
      'trailer-exists': [0, 'never']
    }
  };