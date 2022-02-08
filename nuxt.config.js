export default {
  head: {
    title: 'MrTehran.com - Persian Music Service 24/7',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      }
    ],
    link: [{
        rel: 'apple-touch-icon',
        sizes: "57x57",
        href: '/apple-icon-57x57.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "60x60",
        href: '/apple-icon-60x60.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "72x72",
        href: '/apple-icon-72x72.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "76x76",
        href: '/apple-icon-76x76.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "114x114",
        href: '/apple-icon-114x114.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "120x120",
        href: '/apple-icon-120x120.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "144x144",
        href: '/apple-icon-144x144.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "152x152",
        href: '/apple-icon-152x152.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: "180x180",
        href: '/apple-icon-180x180.png',
      },
      {
        rel: 'icon',
        type: "image/png",
        sizes: "192x192",
        href: '/android-icon-192x192.png',
      },
      {
        rel: 'icon',
        type: "image/png",
        sizes: "32x32",
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: "image/png",
        sizes: "96x96",
        href: '/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: "image/png",
        sizes: "16x16",
        href: '/favicon-16x16.png',
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css",
        integrity: "sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer"
      }
    ]
  },
  css: [
    "@/assets/css/App.scss"
  ],
  plugins: [],
  components: true,
  buildModules: [
    // '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],
  axios: {},
  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  }
}
