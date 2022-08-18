/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://www.xiaojun1994.top',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

module.exports = config
