export default function({ app, $axios, $auth }) {
  const { interval, endpoint } = $auth.options.refreshJWT
  const computedInterval = 1000 * 60 * interval

  if (app.store.state.auth.loggedIn) {
    setInterval(function() {
      $axios({
        method: endpoint.method,
        url: endpoint.url
      }).then(({ data }) => {
        const bearerToken = `Bearer ${data.data.access_token}`
        app.$auth.setToken('local', bearerToken)
        $axios.setToken(bearerToken)
      })
    }, computedInterval)
  }
}
