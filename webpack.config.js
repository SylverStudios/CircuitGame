module.exports = function(environmentType) {

  var isDevEnvironment = !environmentType || environmentType === 'development';

  return {
    entry: './webpage/js/main.js',
    output: {
      filename: 'main.js'
    },
    debug: isDevEnvironment,
  };
}
