import type { LanguageConfig } from './types';
import type { LexerConfig } from '/lexer/types';
import type { ParserConfig } from '/parser/types';

/**
 * @see https://docs.python.org/3/reference/lexical_analysis.html#operators
 */
const operators =
  /* prettier-ignore */ [
  // Operators
  '+', '-', '*', '**', '/', '//', '%', '@',
  '<<', '>>', '&', '|', '^', '~', ':=',
  '<', '>', '<=', '>=', '==', '!=',

  // Delimiters
  ',', ':', '.', ';', '@', '=', '->',
  '+=', '-=', '*=', '/=', '//=', '%=', '@=',
  '&=', '|=', '^=', '>>=', '<<=', '**=',
];

/**
 * @see https://docs.python.org/3/reference/lexical_analysis.html#numeric-literals
 */
const bindigit = '[01]';
const octdigit = '[0-7]';
const digit = '[0-9]';
const nonzerodigit = '[1-9]';
const hexdigit = `(?:${digit}|[a-fA-F])`;

const bininteger = `(?:0[bB](?:_?${bindigit})+)`;
const octinteger = `(?:0[oO](?:_?${octdigit})+)`;
const hexinteger = `(?:0[xX](?:_?${hexdigit})+)`;
const decinteger = `(?:${nonzerodigit}(?:_?${digit})*|0+(?:_?0)*)`;
const integer = `(?:${decinteger}|${bininteger}|${octinteger}|${hexinteger})`;

const digitpart = `(?:${digit}(?:_?${digit})*)`;
const fraction = `(?:\\.${digitpart})`;
const exponent = `(?:[eE][-+]?${digitpart})`;
const pointfloat = `(?:${digitpart}?${fraction}|${digitpart}\\.)`;
const exponentfloat = `(?:(?:${digitpart}|${pointfloat})${exponent})`;
const floatnumber = `(?:${pointfloat}|${exponentfloat})`;

const numbers = new RegExp(`(?:${integer}|${floatnumber})`);

export const lexer: LexerConfig = {
  comments: [{ type: 'line-comment', startsWith: '#' }],
  symbols: /[_a-zA-Z][_a-zA-Z0-9]*/,
  numbers,
  operators,
  brackets: [
    { startsWith: '{', endsWith: '}' },
    { startsWith: '[', endsWith: ']' },
    { startsWith: '(', endsWith: ')' },
  ],
  strings: [
    { startsWith: "'" },
    { startsWith: '"' },
    { startsWith: "'''" },
    { startsWith: '"""' },
    {
      startsWith: "f'",
      endsWith: "'",
      templates: [{ type: 'expr', startsWith: '{', endsWith: '}' }],
    },
    {
      startsWith: 'f"',
      endsWith: '"',
      templates: [{ type: 'expr', startsWith: '{', endsWith: '}' }],
    },
    { startsWith: "r'", endsWith: "'" },
    { startsWith: 'r"', endsWith: '"' },
  ],
};

export const parser: ParserConfig = {
  indentedBlocks: true,
};

export const lang: LanguageConfig = { lexer, parser };
