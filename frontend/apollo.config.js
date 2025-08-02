// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'my-app',
      // URL to the GraphQL API
      url: `${import.meta.env.VITE_API_URL}/graphql`,
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
