var compiler = require('ember-template-compiler')

module.exports = function(opts) {
  if (! opts)
    opts = {}

  return function(operation) {
    return operation.inputs.map(function(resource) {
      var modulePath = resource.filePath
      modulePath = modulePath.replace(/\.hbs/, '')
      if (opts.getModulePath)
        modulePath = opts.getModulePath(modulePath)

      // TODO: source maps
      var output = compiler.precompile(resource.data).toString()

      resource.data = 'define("' + modulePath + '", ["ember", "exports"], function(__dependency1__, __exports__) {\n  "use strict";\n  var Ember = __dependency1__["default"];\n  __exports__["default"] = Ember.Handlebars.template(' + output + ');\n});\n';

      return resource

    })
  }
}
