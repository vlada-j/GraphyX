module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      '../dist/graphyx.js',
      '*.test.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: false,
    concurrency: Infinity,
    browsers: ['Headless_Chrome', 'FirefoxHeadless'],
    customLaunchers: {
	  Headless_Chrome: {
	    base: 'Chrome',
        flags: ['--headless', '--disable-gpu', '--remote-debugging-port=9222', '--http://0.0.0.0:9876/']
      },
      FirefoxHeadless: {
          base: 'Firefox',
          flags: [ '-headless' ]
      }
    }
  })
};
