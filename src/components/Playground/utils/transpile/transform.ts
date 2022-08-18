import { Transform, transform as _transform } from 'sucrase'

const opts = { transforms: ['jsx', 'imports'] as Transform[] }

export default function transform(code: string) {
  return _transform(code, opts).code
}
