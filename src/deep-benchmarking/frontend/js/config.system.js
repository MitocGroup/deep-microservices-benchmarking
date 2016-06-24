System.config({
  baseURL: "deep-benchmarking",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "js/vendor/github/*",
    "npm:*": "js/vendor/npm/*"
  },

  map: {
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88"
  }
});
