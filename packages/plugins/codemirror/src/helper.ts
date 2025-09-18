import { angular } from '@codemirror/lang-angular';
import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { less } from '@codemirror/lang-less';
import { markdown } from '@codemirror/lang-markdown';
import { php } from '@codemirror/lang-php';
import { python } from '@codemirror/lang-python';
import { rust } from '@codemirror/lang-rust';
import { sass } from '@codemirror/lang-sass';
import { sql } from '@codemirror/lang-sql';
import { vue } from '@codemirror/lang-vue';
import { xml } from '@codemirror/lang-xml';
import { yaml } from '@codemirror/lang-yaml';

// 语言映射
export const languageExtensions = {
  javascript: javascript(),
  typescript: javascript({ typescript: true }),
  jsx: javascript({ jsx: true }),
  tsx: javascript({ jsx: true, typescript: true }),
  json: json(),
  css: css(),
  html: html(),
  vue: vue(),
  python: python(),
  sql: sql(),
  xml: xml(),
  markdown: markdown(),
  php: php(),
  rust: rust(),
  cpp: cpp(),
  java: java(),
  yaml: yaml(),
  yml: yaml(),
  go: go(),
  less: less(),
  sass: sass(),
  scss: sass(),
  angular: angular(),
  text: [],
};

export type LanguageType = keyof typeof languageExtensions;
