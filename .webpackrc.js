const path = require('path')

module.exports = {
  output:{
    publicPath:'./',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src'),
    }
  },
  externals:{
    'qq':'qq'
  },
}
