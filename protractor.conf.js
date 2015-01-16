exports.config = {
  specs: ['test/e2e/*/*.spec.js'],
  baseUrl: 'http://localhost:9001', //default test port with Yeoman
  framework: 'jasmine2',
  capabilities: {
    'browserName': 'firefox'
  },
}
