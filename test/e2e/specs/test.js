// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.containsText('h2', 'Create Wallet App')
      .assert.elementCount('a', 3)
      .assert.elementCount('h2', 1)
      .assert.elementCount('input', 1)
      .assert.elementCount('button', 2)
      .end()
  }
}
