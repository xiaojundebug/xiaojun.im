import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  plain: {
    color: '#90a4ae',
    backgroundColor: '#fafafa',
  },
  styles: [
    { types: ['atrule', 'boolean', 'constant', 'function', 'id', 'important', 'keyword', 'symbol'], style: { color: '#7c4dff' } },
    { types: ['attr-name', 'builtin', 'cdata', 'char', 'class', 'inserted', 'operator', 'property', 'punctuation'], style: { color: '#39adb5' } },
    { types: ['attr-value', 'attribute', 'pseudo-class', 'pseudo-element', 'string'], style: { color: '#f6a434' } },
    { types: ['class-name', 'regex'], style: { color: '#6182b8' } },
    { types: ['comment', 'doctype', 'prolog'], style: { color: '#aabfc9' } },
    { types: ['deleted', 'entity', 'selector', 'tag', 'url', 'variable'], style: { color: '#e53935' } },
    { types: ['hexcode', 'number', 'unit'], style: { color: '#f76d47' } },
    { types: ['id', 'important'], style: { fontWeight: 'bold' } },
  ],
}

export default theme
