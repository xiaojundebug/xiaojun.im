import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  plain: {
    color: '#5e6687',
    backgroundColor: '#f5f7ff',
  },
  styles: [
    { types: ['comment', 'prolog', 'doctype', 'cdata'], style: { color: '#898ea4' } },
    { types: ['punctuation'], style: { color: '#5e6687' } },
    { types: ['namespace'], style: { opacity: 0.7 } },
    { types: ['operator', 'boolean', 'number'], style: { color: '#c76b29' } },
    { types: ['property'], style: { color: '#c08b30' } },
    { types: ['tag', 'placeholder', 'variable'], style: { color: '#3d8fd1' } },
    { types: ['string', 'entity', 'statement', 'regex', 'atrule'], style: { color: '#22a2c9' } },
    { types: ['selector'], style: { color: '#6679cc' } },
    { types: ['attr-name'], style: { color: '#c76b29' } },
    { types: ['attr-value', 'keyword', 'control', 'directive', 'unit'], style: { color: '#ac9739' } },
    { types: ['statement', 'regex', 'atrule'], style: { color: '#22a2c9' } },
    { types: ['deleted'], style: { textDecorationLine: 'line-through' } },
    { types: ['inserted'], style: { borderBottom: '1px dotted #202746', textDecorationLine: 'line-through' } },
    { types: ['important', 'bold'], style: { fontWeight: 'bold' } },
    { types: ['important'], style: { color: '#c94922' } },
    { types: ['entity'], style: { cursor: 'help' } },
  ],
}

export default theme
