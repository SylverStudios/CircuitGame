module.exports = function(environmentType) {

  var isDevEnvironment = !environmentType || environmentType === 'development';

  return {
    entry: './src/js/application.js',
    output: {
      filename: 'main.js'
    },
    debug: isDevEnvironment,
  };
}
