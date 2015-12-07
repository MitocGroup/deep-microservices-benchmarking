System.config({
  baseURL: "deep.lambda.benchmark",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "github:*": "js/vendor/github/*",
    "npm:*": "js/vendor/npm/*"
  },

  map: {
    "angular-datatables": "npm:angular-datatables@0.4.3",
    "angular/angular.js": "github:angular/angular.js@1.4.0",
    "css": "github:systemjs/plugin-css@0.1.20",
    "jquery": "github:components/jquery@2.1.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:angular-datatables@0.4.3": {
      "angular": "npm:angular@1.5.0-beta.2",
      "datatables": "npm:datatables@1.10.9",
      "jquery": "npm:jquery@3.0.0-alpha1"
    },
    "npm:angular@1.5.0-beta.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:datatables@1.10.9": {
      "css": "github:systemjs/plugin-css@0.1.20",
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jquery@3.0.0-alpha1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
