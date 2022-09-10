import themeGithub from 'prism-react-renderer/themes/github'
import { PrismTheme } from 'prism-react-renderer'

const theme: PrismTheme = {
  ...themeGithub,
  plain: {
    ...themeGithub.plain,
    backgroundColor: '#f8fafc',
  },
}

export default theme
