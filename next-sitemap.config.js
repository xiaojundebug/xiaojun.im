const { siteUrl } = require('./site.config')

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

module.exports = config
