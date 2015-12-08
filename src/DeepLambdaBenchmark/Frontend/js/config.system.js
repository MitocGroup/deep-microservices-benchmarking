System.config({
  baseURL: "deep.lambda.benchmark",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "js/vendor/github/*",
    "npm:*": "js/vendor/npm/*"
  },

  map: {
    "esvit/ng-table": "github:esvit/ng-table@1.0.0-beta.9",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "twbs/bootstrap": "github:twbs/bootstrap@3.3.6",
    "github:twbs/bootstrap@3.3.6": {
      "jquery": "github:components/jquery@2.1.4"
    }
  }
});
