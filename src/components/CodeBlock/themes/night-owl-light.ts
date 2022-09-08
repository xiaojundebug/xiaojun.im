import themeOwlLight from 'prism-react-renderer/themes/nightOwlLight'
import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  ...themeOwlLight,
  plain: {
    ...themeOwlLight.plain,
    backgroundColor: '#f8fafc',
  },
}

export default theme
