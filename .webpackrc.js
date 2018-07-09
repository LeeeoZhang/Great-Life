const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src'),
    }
  },
  externals:{
    'qq':'qq'
  },
}
