import '@/styles/globals.css'
import '@/styles/reset.css'
import '@/styles/unreset.scss'
import '@/styles/markdown.scss'
import '@/styles/highlighting.scss'
import type { AppProps } from 'next/app'
import PageContainer from '../components/PageContainer'
import BackToTop from '../components/BackToTop'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import NextNProgress from 'nextjs-progressbar'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import config from '@/config'
import { appWithTranslation } from 'next-i18next'
import { IconContext } from 'react-icons'

dayjs.extend(localizedFormat)

function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithCustomProps
}) {
  // Use the layout defined at the page level, if available
  const getLayout =
    Component.getLayout ??
    ((page: React.ReactElement) => (
      <>
        <NextNProgress color="#2563eb" options={{ showSpinner: false }} />
        <ThemeProvider disableTransitionOnChange forcedTheme={Component.theme}>
          <IconContext.Provider value={{ className: 'icon' }}>
            <DefaultSeo title={config.title} description={config.desc} />
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
              />
              <title>{config.title}</title>
            </Head>
            <Header />
            <PageContainer>{page}</PageContainer>
            <Footer />
            <BackToTop />
          </IconContext.Provider>
        </ThemeProvider>
      </>
    ))

  return getLayout(<Component {...pageProps} />) as JSX.Element
}

export default appWithTranslation(App)
