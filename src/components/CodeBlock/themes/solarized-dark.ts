import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  plain: {
    color: '#839496',
    backgroundColor: '#002b36',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#586e75' } },
    { types: ['punctuation'], style: { color: '#93a1a1' } },
    { types: ['property', 'keyword', 'tag', 'variable', 'function', 'class-name'], style: { color: '#268bd2' } },
    { types: ['class-name'], style: { textDecoration: 'underline' } },
    { types: ['boolean', 'constant'], style: { color: '#b58900' } },
    { types: ['symbol', 'deleted'], style: { color: '#dc322f' } },
    { types: ['number', 'selector', 'attr-name', 'string', 'char', 'builtin', 'inserted'], style: { color: '#859900' } },
    { types: ['operator'], style: { color: '#ededed' } },
    { types: ['function'], style: { color: '#268bd2' } },
    { types: ['regex'], style: { color: '#e9c062' } },
    { types: ['important'], style: { color: '#fd971f' } },
    { types: ['entity'], style: { color: '#ffffb6', cursor: 'help' } },
    { types: ['url'], style: { color: '#96cbfe' } },
    { types: ['string'], style: { color: '#87c38a' } },
    { types: ['important', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['italic'], style: { fontStyle: 'italic' } },
    { types: ['atrule', 'attr-value'], style: { color: '#f9ee98' } },
  ],
}

export default theme
