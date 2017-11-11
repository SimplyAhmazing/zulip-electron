const test = require('tape')
const setup = require('./setup')

test('app runs', function (t) {
  t.timeoutAfter(10e3)
  setup.resetTestDataDir()
  const app = setup.createApp()
  setup.waitForLoad(app, t)
    // .then(() => setup.screenshotCreateOrCompare(app, t, 'app-basic'))
    // TODO: check that input element for server exists...
    .then(() => setup.endTest(app, t),
          (err) => setup.endTest(app, t, err || 'error'))
})